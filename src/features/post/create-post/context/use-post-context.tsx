'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useSocialMediaAccounts } from '@/entities/account'
import { PostType, ScheduledDate } from '@/entities/post/model/post.types'
import { useRtkPostService } from '@/entities/post/model/use-rtk-post-service'
import { useGetUserSettingsQuery } from '@/entities/user'
import { useAccountManagement } from '@/features/post/post-management/model/use-account-management'
import { useLinksManagement } from '@/features/post/post-management/model/use-links-management'
import { useMediaManagement } from '@/features/post/post-management/model/use-media-management'
import { useTagsManagement } from '@/features/post/post-management/model/use-tags-management'
import { useTikTokSettings } from '@/features/post/post-management/model/use-tik-tok-settings'
import { detectDeviceTimezone } from '@/shared/utils/timezone'

import { CoverData, CreatePostContextValue, CreatePostProviderProps } from '../model/types'
import { useCopyPostInitializer } from '../model/use-copy-post-initializer'
import { useCoverDataHandler } from '../model/use-cover-data-handler'
import { usePostErrorHandler } from '../model/use-post-error-handler'
import { usePostNotifications } from '../model/use-post-notifications'
import { usePostSubmission } from '../model/use-post-submission'
import { usePostTextChange } from '../model/use-post-text-change'
import { useScheduledPostsSync } from '../model/use-scheduled-posts-sync'

const DEFAULT_SCHEDULE_TIME = '00:00'

const createInitialScheduledDate = (timezone?: string, initialDate?: Date): ScheduledDate => ({
    date: initialDate ?? new Date(),
    time: DEFAULT_SCHEDULE_TIME,
    ...(timezone ? { timezone } : {}),
})

const PostContext = createContext<CreatePostContextValue | undefined>(undefined)

export const CreatePostProvider = ({ children, copyData, initialTimezone, initialScheduledDate }: CreatePostProviderProps) => {
    const { sendPosts, createStatus } = useRtkPostService()
    const { accounts } = useSocialMediaAccounts()

    const timezoneFallbackRef = useRef<string>(initialTimezone ?? detectDeviceTimezone())

    const { data: userSettings } = useGetUserSettingsQuery()
    const preferredTimezone = userSettings?.timezone

    const [mainCaption, setMainCaption] = useState<string>('')
    const [postType, setPostType] = useState<PostType>(PostType.media)
    const [shouldSchedule, setShouldSchedule] = useState<boolean>(false)
    const [scheduledTime, setScheduleTime] = useState<ScheduledDate>(() =>
        createInitialScheduledDate(timezoneFallbackRef.current, initialScheduledDate)
    )
    const [coverData, setCoverData] = useState<CoverData>({})

    useEffect(() => {
        if (!initialTimezone) return
        timezoneFallbackRef.current = initialTimezone
        setScheduleTime((prev) => {
            if (prev.timezone === initialTimezone) {
                return prev
            }
            return {
                ...prev,
                timezone: initialTimezone,
            }
        })
    }, [initialTimezone])

    useEffect(() => {
        if (!preferredTimezone) return
        timezoneFallbackRef.current = preferredTimezone
        setScheduleTime((prev) => {
            if (prev.timezone === preferredTimezone) {
                return prev
            }
            return {
                ...prev,
                timezone: preferredTimezone,
            }
        })
    }, [preferredTimezone])

    const {
        media,
        mediaType,
        previewUrls,
        setMedia,
        setMediaType,
        setPreviewUrls,
        onFileSelect,
        resetMedia,
    } = useMediaManagement()

    const {
        addTagToAccount,
        removeTagFromAccount,
        clearAccountTags,
        getAccountTags,
        setCurrentTag,
        currentTag,
        accountTags,
        resetTags,
    } = useTagsManagement()

    const {
        addLinkToAccount,
        removeLinkFromAccount,
        clearAccountLinks,
        getAccountLinks,
        setCurrentLink,
        getCurrentLink,
        currentLinks,
        accountLinks,
        resetLinks,
    } = useLinksManagement()

    const { onEnableTikTokAutoMusic, tikTokAutoMusicEnabled, resetTikTokSettings } = useTikTokSettings()

    const {
        selectedAccounts,
        scheduledPosts,
        setSelectedAccounts,
        setScheduledPosts,
        onAccountSelect,
        onPinterestBoardSelect,
        updateScheduledPosts,
        resetAccounts,
        updateScheduledPost,
    } = useAccountManagement({
        mainCaption,
        scheduledTime,
        accountTags,
        accountLinks,
        tikTokAutoMusicEnabled,
        media,
        postType,
    })

    useScheduledPostsSync({
        selectedAccounts,
        mainCaption,
        media,
        postType,
        scheduledTime,
        accountTags,
        accountLinks,
        tikTokAutoMusicEnabled,
        updateScheduledPosts,
    })

    usePostNotifications({
        isError: createStatus.isError,
        isSuccess: createStatus.isSuccess,
    })

    useCopyPostInitializer({
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
        preferredTimezone: scheduledTime.timezone ?? timezoneFallbackRef.current,
    })

    const pathname = usePathname()
    const router = useRouter()
    const errorHandler = usePostErrorHandler({ pathname, push: router.push })

    const onPostTextChange = usePostTextChange({
        setMainCaption,
        setScheduledPosts,
        accountTags,
        accountLinks,
        tikTokAutoMusicEnabled,
    })

    const onPostDateTimeChange = useCallback((date: Date | null, time: string | null) => {
        if (!date && !time) {
            return
        }

        setScheduleTime((prev) => {
            const base = prev ?? createInitialScheduledDate(timezoneFallbackRef.current)

            return {
                ...base,
                ...(date ? { date } : {}),
                ...(time ? { time } : {}),
            }
        })
    }, [])

    const onCoverDataSelect = useCoverDataHandler(setCoverData)

    const {
        schedulePosts,
        draftPosts,
        publishPosts,
        isDraftLoading,
        isCreateLoading,
        isScheduleLoading,
        resetForm,
    } = usePostSubmission({
        sendPosts,
        postType,
        shouldSchedule,
        scheduledTime,
        media,
        mainCaption,
        coverData,
        previewUrls,
        copyData,
        accountManagement: {
            scheduledPosts,
        },
        accountTags,
        accountLinks,
        tikTokAutoMusicEnabled,
        resetParams: {
            resetMedia,
            resetAccounts,
            resetTags,
            resetLinks,
            resetTikTokSettings,
            setMainCaption,
            setShouldSchedule,
            setCoverData,
        },
        errorHandler,
    })

    const contextValue = useMemo<CreatePostContextValue>(() => {
        return {
            media,
            mediaType,
            previewUrls,
            mainCaption,
            selectedAccounts,
            postType,
            scheduledPosts,
            shouldSchedule,
            isLoading: createStatus.isLoading,
            isDraftLoading,
            isCreateLoading,
            isScheduleLoading,
            scheduledTime,
            coverData,
            currentTag,
            accountTags,
            currentLinks,
            accountLinks,
            tikTokAutoMusicEnabled,
            setMedia,
            setMediaType,
            setPreviewUrls,
            setMainCaption,
            onAccountSelect,
            onFileSelect,
            onPostTextChange,
            onPostDateTimeChange,
            setShouldSchedule,
            schedulePosts,
            draftPosts,
            publishPosts,
            resetForm,
            onPinterestBoardSelect,
            setPostType,
            onCoverDataSelect,
            setCurrentTag,
            addTagToAccount,
            removeTagFromAccount,
            clearAccountTags,
            getAccountTags,
            setCurrentLink,
            getCurrentLink,
            addLinkToAccount,
            removeLinkFromAccount,
            clearAccountLinks,
            getAccountLinks,
            onEnableTikTokAutoMusic,
            updateScheduledPost,
        }
    }, [
        selectedAccounts,
        scheduledPosts,
        coverData,
        createStatus.isLoading,
        draftPosts,
        isCreateLoading,
        isDraftLoading,
        isScheduleLoading,
        mainCaption,
        media,
        mediaType,
        previewUrls,
        onAccountSelect,
        onCoverDataSelect,
        onFileSelect,
        onPostDateTimeChange,
        onPostTextChange,
        onEnableTikTokAutoMusic,
        postType,
        publishPosts,
        resetForm,
        schedulePosts,
        scheduledTime,
        shouldSchedule,
        tikTokAutoMusicEnabled,
        accountTags,
        accountLinks,
        addLinkToAccount,
        addTagToAccount,
        clearAccountLinks,
        clearAccountTags,
        currentLinks,
        currentTag,
        getAccountLinks,
        getAccountTags,
        removeLinkFromAccount,
        removeTagFromAccount,
        setCurrentLink,
        getCurrentLink,
        setCurrentTag,
        setMedia,
        setMediaType,
        setPreviewUrls,
        setMainCaption,
        setShouldSchedule,
        setPostType,
        onPinterestBoardSelect,
        updateScheduledPost,
    ])

    return <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
}

export function useCreatePostContext(_copyData?: string): CreatePostContextValue {
    const context = useContext(PostContext)
    if (!context) {
        throw new Error('useCreatePostContext must be used within a CreatePostProvider')
    }
    return context
}

export const usePostContext = useCreatePostContext
export const PostProvider = CreatePostProvider
export type PostContextType = CreatePostContextValue
