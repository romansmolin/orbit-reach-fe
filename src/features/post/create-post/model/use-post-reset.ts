import { Dispatch, SetStateAction, useCallback } from 'react'

import { CoverData } from './types'

type SetState<T> = Dispatch<SetStateAction<T>>

type SetBooleanState = Dispatch<SetStateAction<boolean>>

interface PostResetParams {
    resetMedia: () => void
    resetAccounts: () => void
    resetTags: () => void
    resetLinks: () => void
    resetTikTokSettings: () => void
    setMainCaption: SetState<string>
    setShouldSchedule: SetBooleanState
    setCoverData: SetState<CoverData>
}

export const usePostReset = ({
    resetMedia,
    resetAccounts,
    resetTags,
    resetLinks,
    resetTikTokSettings,
    setMainCaption,
    setShouldSchedule,
    setCoverData,
}: PostResetParams) => {
    return useCallback(() => {
        resetMedia()
        setMainCaption('')
        resetAccounts()
        setShouldSchedule(false)
        setCoverData({})
        resetTags()
        resetLinks()
        resetTikTokSettings()
    }, [
        resetAccounts,
        resetLinks,
        resetMedia,
        resetTags,
        resetTikTokSettings,
        setCoverData,
        setMainCaption,
        setShouldSchedule,
    ])
}
