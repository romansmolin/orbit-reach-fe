import { useCallback, useMemo, useState } from 'react'

import { PostFormSchema, PostStatus } from '@/entities/post'
import { PostType, ScheduledDate } from '@/entities/post/model/post.types'
import { PostFormService } from '@/features/post/post-management/services/post-form.service'
import { notifyError } from '@/shared/lib/notifications'

import { CoverData } from './types'
import { PostErrorHandler } from './use-post-error-handler'
import { usePostReset } from './use-post-reset'

interface PostSubmissionParams {
    sendPosts: (
        posts: PostFormSchema[],
        postType: PostType,
        shouldSchedule: boolean,
        scheduleTime: ScheduledDate,
        media?: File[] | null,
        mainCaption?: string | null,
        status?: any,
        coverTimestamp?: number,
        coverImage?: File,
        copyDataUrls?: string[],
        postNow?: boolean
    ) => Promise<void>
    postType: PostType
    shouldSchedule: boolean
    scheduledTime: ScheduledDate
    media: File[] | undefined
    mainCaption: string
    coverData: CoverData
    previewUrls: string[]
    copyData?: string
    accountManagement: {
        scheduledPosts: PostFormSchema[]
    }
    accountTags: Record<string, string[]>
    accountLinks: Record<string, string[]>
    tikTokAutoMusicEnabled: Record<string, boolean>
    resetParams: Parameters<typeof usePostReset>[0]
    errorHandler: PostErrorHandler
}

interface PostSubmissionState {
    schedulePosts: () => Promise<void>
    draftPosts: () => Promise<void>
    publishPosts: () => Promise<void>
    isDraftLoading: boolean
    isCreateLoading: boolean
    isScheduleLoading: boolean
    resetForm: () => void
}

const SUBMIT_ERROR_MESSAGE = 'Failed to submit posts. Please try again.'
const DRAFT_ERROR_MESSAGE = 'Failed to draft posts. Please try again.'

export const usePostSubmission = ({
    sendPosts,
    postType,
    shouldSchedule,
    scheduledTime,
    media,
    mainCaption,
    coverData,
    previewUrls,
    copyData,
    accountManagement,
    accountTags,
    accountLinks,
    tikTokAutoMusicEnabled,
    resetParams,
    errorHandler,
}: PostSubmissionParams): PostSubmissionState => {
    const [isDraftLoading, setIsDraftLoading] = useState(false)
    const [isCreateLoading, setIsCreateLoading] = useState(false)
    const [isScheduleLoading, setIsScheduleLoading] = useState(false)

    const resetForm = usePostReset(resetParams)

    const preparedPosts = useMemo(
        () =>
            PostFormService.preparePostsForSubmission(
                accountManagement.scheduledPosts,
                accountTags,
                accountLinks,
                tikTokAutoMusicEnabled
            ),
        [
            accountLinks,
            accountManagement.scheduledPosts,
            accountTags,
            tikTokAutoMusicEnabled,
        ]
    )

    const resolvedMedia = useMemo(() => (postType === PostType.media ? media || null : null), [
        media,
        postType,
    ])

    const copyDataUrls = useMemo(() => (copyData ? previewUrls : undefined), [copyData, previewUrls])

    const submit = useCallback(
        async (
            options: {
                shouldScheduleValue: boolean
                scheduleTimeValue: ScheduledDate
                postNow?: boolean
                onLoadingChange: (loading: boolean) => void
                errorMessage: string
                statusOverride?: PostStatus
            }
        ) => {
            const {
                shouldScheduleValue,
                scheduleTimeValue,
                postNow,
                onLoadingChange,
                errorMessage,
                statusOverride,
            } = options

            onLoadingChange(true)

            try {
                await sendPosts(
                    preparedPosts,
                    postType,
                    shouldScheduleValue,
                    scheduleTimeValue,
                    resolvedMedia,
                    mainCaption,
                    statusOverride,
                    coverData.timestamp,
                    coverData.image,
                    copyDataUrls,
                    postNow
                )

                resetForm()
            } catch (error: unknown) {
                errorHandler(error)
                notifyError(errorMessage)
            } finally {
                onLoadingChange(false)
            }
        },
        [
            coverData.image,
            coverData.timestamp,
            copyDataUrls,
            errorHandler,
            mainCaption,
            postType,
            preparedPosts,
            resolvedMedia,
            resetForm,
            sendPosts,
        ]
    )

    const schedulePosts = useCallback(async () => {
        await submit({
            shouldScheduleValue: shouldSchedule,
            scheduleTimeValue: scheduledTime,
            onLoadingChange: setIsScheduleLoading,
            errorMessage: SUBMIT_ERROR_MESSAGE,
        })
    }, [scheduledTime, shouldSchedule, submit])

    const draftPosts = useCallback(async () => {
        await submit({
            shouldScheduleValue: shouldSchedule,
            scheduleTimeValue: scheduledTime,
            onLoadingChange: setIsDraftLoading,
            errorMessage: DRAFT_ERROR_MESSAGE,
            statusOverride: PostStatus.DRAFT,
        })
    }, [scheduledTime, shouldSchedule, submit])

    const publishPosts = useCallback(async () => {
        await submit({
            shouldScheduleValue: shouldSchedule,
            scheduleTimeValue: {
                date: new Date(),
                time: '00:00',
                timezone: scheduledTime.timezone,
            },
            onLoadingChange: setIsCreateLoading,
            errorMessage: SUBMIT_ERROR_MESSAGE,
            postNow: true,
        })
    }, [scheduledTime.timezone, shouldSchedule, submit])

    return {
        schedulePosts,
        draftPosts,
        publishPosts,
        isDraftLoading,
        isCreateLoading,
        isScheduleLoading,
        resetForm,
    }
}
