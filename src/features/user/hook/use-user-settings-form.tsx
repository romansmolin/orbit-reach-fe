'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { toast } from 'sonner'

import {
    IUserSettings,
    useChangeUserPrefferedTimezoneMutation,
    useSetUserPrefferedTimezoneMutation,
} from '@/entities/user'
import { FALLBACK_TIMEZONES } from '@/shared/const/timezones'
import {
    detectDeviceTimezone,
    formatTimezoneLabel,
    getSupportedTimezones,
    getTimezoneOffsetMinutes,
} from '@/shared/utils/timezone'

interface TimezoneOption {
    value: string
    label: string
    offsetMinutes: number
}

interface UseUserSettingsFormResult {
    timezone: string
    timezoneOptions: TimezoneOption[]
    onTimezoneChange: (value: string) => void
    handleTimezoneSubmit: () => void
    isLoading: boolean
}

const sanitizeTimezone = (timezone?: string | null) => {
    if (!timezone) return null

    const trimmed = timezone.trim()
    return trimmed.length > 0 ? trimmed : null
}

const arraysAreEqual = (a: string[], b: string[]) => {
    if (a === b) return true
    if (a.length !== b.length) return false

    return a.every((value, index) => value === b[index])
}

export const useUserSettingsForm = (
    initialSetting: IUserSettings | null | undefined
): UseUserSettingsFormResult => {
    const [triggerTimezoneSaving, { isLoading: isSaving }] = useSetUserPrefferedTimezoneMutation()
    const [triggerTimezoneChange, { isLoading: isChanging }] = useChangeUserPrefferedTimezoneMutation()

    const initialTimezone = sanitizeTimezone(initialSetting?.timezone)

    const [timezone, setTimezone] = useState<string>(initialTimezone ?? 'UTC')
    const [hasPersistedTimezone, setHasPersistedTimezone] = useState<boolean>(() => Boolean(initialTimezone))

    const [availableTimezones, setAvailableTimezones] = useState<string[]>(
        () => getSupportedTimezones() ?? [...FALLBACK_TIMEZONES]
    )

    useEffect(() => {
        const supportedTimezones = getSupportedTimezones()
        if (!supportedTimezones?.length) return

        setAvailableTimezones((prev) => {
            if (arraysAreEqual(prev, supportedTimezones)) {
                return prev
            }

            return supportedTimezones
        })
    }, [])

    useEffect(() => {
        setHasPersistedTimezone(Boolean(sanitizeTimezone(initialSetting?.timezone)))
    }, [initialSetting])

    useEffect(() => {
        if (!initialTimezone) return
        setTimezone(initialTimezone)
    }, [initialTimezone])

    useEffect(() => {
        if (initialTimezone) return

        const detectedTimezone = detectDeviceTimezone()
        if (!detectedTimezone) return

        setTimezone((prev) => (prev === detectedTimezone ? prev : detectedTimezone))
    }, [initialTimezone])

    const timezoneOptions = useMemo<TimezoneOption[]>(() => {
        const unique = new Set<string>()
        const ordered: string[] = []

        const register = (value?: string | null) => {
            if (!value || unique.has(value)) return
            unique.add(value)
            ordered.push(value)
        }

        register(initialTimezone)
        register(timezone)

        const source = availableTimezones.length ? availableTimezones : Array.from(FALLBACK_TIMEZONES)
        source.forEach(register)
        register('UTC')

        const options = ordered.map<TimezoneOption>((value) => {
            const offsetMinutes = getTimezoneOffsetMinutes(value)

            return {
                value,
                label: formatTimezoneLabel(value, offsetMinutes),
                offsetMinutes,
            }
        })

        options.sort((a, b) => {
            if (a.offsetMinutes === b.offsetMinutes) {
                return a.label.localeCompare(b.label)
            }
            return a.offsetMinutes - b.offsetMinutes
        })

        return options
    }, [availableTimezones, initialTimezone, timezone])

    const handleTimezoneChange = useCallback((value: string) => {
        setTimezone(value)
    }, [])

    const handleTimezoneSubmit = useCallback(async () => {
        const sanitized = sanitizeTimezone(timezone)
        if (!sanitized) {
            toast.error('Please select a timezone before saving.')
            return
        }

        try {
            if (hasPersistedTimezone) {
                await triggerTimezoneChange({ timezone: sanitized }).unwrap()
                toast.success('Timezone changed successfully!')
            } else {
                await triggerTimezoneSaving({ timezone: sanitized }).unwrap()
                toast.success('Timezone set successfully!')
                setHasPersistedTimezone(true)
            }
        } catch {
            toast.error('Failed to update timezone. Please try again.')
        }
    }, [hasPersistedTimezone, timezone, triggerTimezoneChange, triggerTimezoneSaving])

    const isSubmitting = isSaving || isChanging

    return {
        timezone,
        timezoneOptions,
        onTimezoneChange: handleTimezoneChange,
        handleTimezoneSubmit,
        isLoading: isSubmitting,
    }
}
