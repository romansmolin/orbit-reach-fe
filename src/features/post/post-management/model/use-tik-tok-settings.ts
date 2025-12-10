'use client'

import { useCallback, useState } from 'react'

interface UseTikTokSettingsProps {
    initialSettings?: Record<string, boolean>
}

export const useTikTokSettings = ({ initialSettings = {} }: UseTikTokSettingsProps = {}) => {
    const [tikTokAutoMusicEnabled, setTikTokAutoMusicEnabled] =
        useState<Record<string, boolean>>(initialSettings)

    const onEnableTikTokAutoMusic = useCallback((accountId: string, enable: boolean) => {
        setTikTokAutoMusicEnabled((prevState: Record<string, boolean>) => ({
            ...prevState,
            [accountId]: enable,
        }))
    }, [])

    const resetTikTokSettings = useCallback(() => {
        setTikTokAutoMusicEnabled({})
    }, [])

    return {
        tikTokAutoMusicEnabled,

        onEnableTikTokAutoMusic,
        resetTikTokSettings,
    }
}
