'use client'

import React from 'react'

import { IUserSettings } from '@/entities/user'
import { GenericSelect } from '@/shared/components/generic-select/ui/generic-select'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'

import { useUserSettingsForm } from '../hook/use-user-settings-form'

interface UserSettingsFormProps {
    initialSetting: IUserSettings | null | undefined
}

export const UserSettingsForm = ({ initialSetting }: UserSettingsFormProps) => {
    const { timezone, timezoneOptions, onTimezoneChange, isLoading, handleTimezoneSubmit } =
        useUserSettingsForm(initialSetting)

    return (
        <section aria-labelledby="user-settings-timezone" className="flex flex-col gap-6">
            <div className="max-w-lg space-y-3">
                <div className="space-y-1">
                    <Label htmlFor="timezone" id="user-settings-timezone">
                        Timezone
                    </Label>
                    <p className="text-sm text-muted-foreground">
                        Choose the timezone we should use when planning and publishing your posts.
                    </p>
                </div>

                <div className="flex gap-3">
                    <GenericSelect
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        handleSelect={onTimezoneChange}
                        options={timezoneOptions}
                        placeholder="Select your timezone"
                        selectLabel="vailable timezones"
                        selectTriggerClass="w-full"
                        selectValue={timezone}
                    />

                    <Button disabled={isLoading} size={'lg'} onClick={handleTimezoneSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </section>
    )
}
