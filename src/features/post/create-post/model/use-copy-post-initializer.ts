import { Dispatch, SetStateAction, useEffect } from 'react'

import { Account } from '@/entities/account'
import { PostFormSchema } from '@/entities/post'
import { MediaType, PostType, ScheduledDate } from '@/entities/post/model/post.types'
import { convertCopiedDataToFormData, parseCopiedPostData } from '@/features/post/copy-post'

interface CopyPostInitializerParams {
    copyData?: string
    accounts: Account[] | undefined
    setPostType: Dispatch<SetStateAction<PostType>>
    setMainCaption: Dispatch<SetStateAction<string>>
    setSelectedAccounts: Dispatch<SetStateAction<Account[]>>
    setScheduledPosts: Dispatch<SetStateAction<PostFormSchema[]>>
    setScheduleTime: Dispatch<SetStateAction<ScheduledDate>>
    setShouldSchedule: Dispatch<SetStateAction<boolean>>
    setPreviewUrls: Dispatch<SetStateAction<string[]>>
    setMediaType: Dispatch<SetStateAction<MediaType>>
    preferredTimezone?: string
}

export const useCopyPostInitializer = ({
    copyData,
    accounts,
    setPostType,
    setMainCaption,
    setSelectedAccounts,
    setScheduledPosts,
    setScheduleTime,
    setShouldSchedule,
    setPreviewUrls,
    setMediaType,
    preferredTimezone,
}: CopyPostInitializerParams) => {
    useEffect(() => {
        if (!copyData || !accounts || accounts.length === 0) {
            return
        }

        const parsedData = parseCopiedPostData(copyData)
        if (!parsedData) {
            return
        }

        const formData = convertCopiedDataToFormData(parsedData, accounts, {
            preferredTimezone,
        })

        setPostType(formData.postType)
        setMainCaption(formData.mainCaption)
        setSelectedAccounts(formData.selectedAccounts)
        setScheduledPosts(formData.scheduledPosts)
        setScheduleTime(formData.scheduledTime)
        setShouldSchedule(formData.shouldSchedule)
        setPreviewUrls(formData.previewUrls)
        setMediaType(formData.mediaType as MediaType)
    }, [
        accounts,
        copyData,
        setMainCaption,
        setMediaType,
        setPostType,
        setPreviewUrls,
        setScheduleTime,
        setScheduledPosts,
        setSelectedAccounts,
        setShouldSchedule,
        preferredTimezone,
    ])
}
