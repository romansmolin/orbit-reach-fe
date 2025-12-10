'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { AccountPlatform, useSocialMediaAccounts } from '@/entities/account'
import {
    IPost,
    MediaType,
    PostFormSchema,
    PostType,
    ScheduledDate,
    useRtkPostService,
} from '@/entities/post'
import { useGetUserSettingsQuery } from '@/entities/user'
import { useAccountManagement } from '@/features/post/post-management/model/use-account-management'
import { useLinksManagement } from '@/features/post/post-management/model/use-links-management'
import { useMediaManagement } from '@/features/post/post-management/model/use-media-management'
import { useTagsManagement } from '@/features/post/post-management/model/use-tags-management'
import { useTikTokSettings } from '@/features/post/post-management/model/use-tik-tok-settings'
import { PostFormService } from '@/features/post/post-management/services/post-form.service'
import { useScheduledPostsSync } from '@/features/post/create-post/model/use-scheduled-posts-sync'
import { detectDeviceTimezone } from '@/shared/utils/timezone'

export const useEditPost = (post: IPost) => {
    const { accounts, isLoading: isLoadingAccounts } = useSocialMediaAccounts()
    const { editPost, editStatus } = useRtkPostService()

    const isEditingPost = editStatus.isLoading
    const isError = editStatus.isError
    const isSuccess = editStatus.isSuccess

    const router = useRouter()

    const timezoneFallbackRef = useRef<string>(detectDeviceTimezone())
    const { data: userSettings } = useGetUserSettingsQuery()
    const preferredTimezone = userSettings?.timezone

    const initialScheduledDate = post.scheduledTime ? new Date(post.scheduledTime) : new Date()
    const initialScheduledTimeValue = post.scheduledTime
        ? new Date(post.scheduledTime).toLocaleTimeString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
          })
        : '00:00'

    const [mainCaption, setMainCaption] = useState<string>(post.mainCaption || '')
    const [shouldSchedule, setShouldSchedule] = useState<boolean>(!!post.scheduledTime)
    const [scheduledTime, setScheduledTime] = useState<ScheduledDate>(() => ({
        date: initialScheduledDate,
        time: initialScheduledTimeValue,
        timezone: timezoneFallbackRef.current,
    }))

    useEffect(() => {
        if (!preferredTimezone) return
        timezoneFallbackRef.current = preferredTimezone
        setScheduledTime((prev) => {
            if (prev.timezone === preferredTimezone) {
                return prev
            }
            return {
                ...prev,
                timezone: preferredTimezone,
            }
        })
    }, [preferredTimezone])

    // Initialize shared hooks with post data
    const mediaManagement = useMediaManagement({
        initialMedia: [],
        initialMediaType: MediaType.IMAGE,
        initialPreviewUrls: post.media.map((post) => post.url),
    })

    const tagsManagement = useTagsManagement()
    const linksManagement = useLinksManagement()
    const tikTokSettings = useTikTokSettings()

    const accountManagement = useAccountManagement({
        mainCaption,
        scheduledTime,
        accountTags: tagsManagement.accountTags,
        accountLinks: linksManagement.accountLinks,
        tikTokAutoMusicEnabled: tikTokSettings.tikTokAutoMusicEnabled,
        media: mediaManagement.media,
        postType: post.type,
    })

    useScheduledPostsSync({
        selectedAccounts: accountManagement.selectedAccounts,
        mainCaption,
        media: mediaManagement.media,
        postType: post.type,
        scheduledTime,
        accountTags: tagsManagement.accountTags,
        accountLinks: linksManagement.accountLinks,
        tikTokAutoMusicEnabled: tikTokSettings.tikTokAutoMusicEnabled,
        updateScheduledPosts: accountManagement.updateScheduledPosts,
    })

    // Initialize posts for editing from post targets
    useEffect(() => {
        const postsForEditing = post.targets.map((target) => {
                const accountTagsForPost = tagsManagement.accountTags[target.socialAccountId] || []
                const accountLinksForPost = linksManagement.accountLinks[target.socialAccountId] || []

                return {
                    account: target.socialAccountId,
                platform: target.platform,
                text: target.text || '',
                scheduledDate: scheduledTime,
                mainCaption: mainCaption || '',
                tags: accountTagsForPost.length > 0 ? accountTagsForPost : undefined,
                links:
                    accountLinksForPost.length > 0 && target.platform === AccountPlatform.threads
                        ? accountLinksForPost
                        : undefined,
                    ...(target.platform === AccountPlatform.tiktok && {
                        isAutoMusicEnabled:
                            tikTokSettings.tikTokAutoMusicEnabled[target.socialAccountId] || false,
                    }),
                    ...((target.platform === AccountPlatform.facebook ||
                        target.platform === AccountPlatform.tiktok) && { title: target.title || '' }),
                    ...(target.platform === AccountPlatform.instagram &&
                        target.instagramFacebookPageId && {
                            instagramFacebookPageId: target.instagramFacebookPageId,
                        }),
                    ...(post.type === PostType.media &&
                        mediaManagement.media && { media: mediaManagement.media }),
                }
            })

        accountManagement.setScheduledPosts(postsForEditing)
    }, [
        post,
        scheduledTime,
        mediaManagement.media,
        mainCaption,
        tagsManagement.accountTags,
        linksManagement.accountLinks,
        tikTokSettings.tikTokAutoMusicEnabled,
    ])

    useEffect(() => {
        if (accounts && accounts.length > 0) {
            const initialAccounts = accounts.filter((account) =>
                post.targets.some((target) => target.socialAccountId === account.id)
            )
            accountManagement.setSelectedAccounts(initialAccounts)
        }
    }, [accounts, post.targets])

    useEffect(() => {
        const initialTags: Record<string, string[]> = {}
        const initialLinks: Record<string, string[]> = {}

        post.targets.forEach((target) => {
            if (target.tags && target.tags.length > 0) {
                initialTags[target.socialAccountId] = target.tags
            }
            if (target.links && target.links.length > 0) {
                initialLinks[target.socialAccountId] = target.links
            }
        })

        // Initialize tags and links in the shared hooks
        Object.entries(initialTags).forEach(([accountId, tags]) => {
            tags.forEach((tag) => tagsManagement.addTagToAccount(accountId, tag))
        })
        Object.entries(initialLinks).forEach(([accountId, links]) => {
            links.forEach((link) => linksManagement.addLinkToAccount(accountId, link))
        })
    }, [post.targets])

    useEffect(() => {
        if (isSuccess) {
            toast.success('Post updated succssfully!')
            router.refresh()
        }

        if (isError) toast.error('Post is not updated! Something went wrong!')
    }, [isSuccess, isError])

    // Use the shared file selection logic
    const onFileSelect = mediaManagement.onFileSelect

    // Use the shared account selection logic
    const onAccountSelect = accountManagement.onAccountSelect

    const onPostTextChange = useCallback(
        (text: string, accountId: string, platform?: AccountPlatform, title?: string) => {
            if (!platform) {
                // Main text changed – apply to all
                setMainCaption(text)
                accountManagement.setScheduledPosts((prev) =>
                    prev.map((post) => {
                        return PostFormService.updatePostWithTagsAndLinks(
                            { ...post, text },
                            tagsManagement.accountTags,
                            linksManagement.accountLinks,
                            tikTokSettings.tikTokAutoMusicEnabled
                        )
                    })
                )
                return
            }

            // Platform-specific text override
            accountManagement.setScheduledPosts((prev) =>
                prev.map((post) => {
                    if (post.account === accountId) {
                        const updatedPost: PostFormSchema = {
                            ...post,
                            text,
                            ...(typeof title !== 'undefined' ? { title } : {}),
                        }

                        return PostFormService.updatePostWithTagsAndLinks(
                            updatedPost,
                            tagsManagement.accountTags,
                            linksManagement.accountLinks,
                            tikTokSettings.tikTokAutoMusicEnabled
                        )
                    }
                    return post
                })
            )
        },
        [tagsManagement.accountTags, linksManagement.accountLinks, tikTokSettings.tikTokAutoMusicEnabled]
    )

    const onPostDateTimeChange = useCallback((date: Date | null, time: string | null) => {
        if (!date && !time) {
            return
        }

        setScheduledTime((prev) => {
            const base =
                prev ??
                ({
                    date: date ?? new Date(),
                    time: time ?? '00:00',
                    timezone: timezoneFallbackRef.current,
                } satisfies ScheduledDate)

            return {
                ...base,
                ...(date ? { date } : {}),
                ...(time ? { time } : {}),
            }
        })
    }, [])

    // Use shared hooks for tags, links, and TikTok settings
    const {
        addTagToAccount,
        removeTagFromAccount,
        clearAccountTags,
        getAccountTags,
        setCurrentTag,
        currentTag,
        accountTags,
    } = tagsManagement

    const {
        addLinkToAccount,
        removeLinkFromAccount,
        clearAccountLinks,
        getAccountLinks,
        setCurrentLink,
        getCurrentLink,
        currentLinks,
        accountLinks,
    } = linksManagement

    const { onEnableTikTokAutoMusic, tikTokAutoMusicEnabled } = tikTokSettings

    const handleSave = useCallback(async () => {
        try {
            const postsWithTags = PostFormService.preparePostsForSubmission(
                accountManagement.scheduledPosts,
                tagsManagement.accountTags,
                linksManagement.accountLinks,
                tikTokSettings.tikTokAutoMusicEnabled
            )

            await editPost(
                post.postId,
                // @ts-ignore
                postsWithTags,
                post.type,
                shouldSchedule,
                scheduledTime,
                mediaManagement.media, // Pass the new media file if selected
                mainCaption
            )
        } catch (error) {
            console.error('Failed to edit post:', error)
            throw error
        }
    }, [
        editPost,
        post.postId,
        post.type,
        accountManagement.scheduledPosts,
        shouldSchedule,
        scheduledTime,
        mediaManagement.media,
        mainCaption,
        tagsManagement.accountTags,
        linksManagement.accountLinks,
        tikTokSettings.tikTokAutoMusicEnabled,
    ])

    return {
        // State
        selectedAccounts: accountManagement.selectedAccounts,
        scheduledPosts: accountManagement.scheduledPosts,
        mainCaption,
        shouldSchedule,
        scheduledTime,
        accounts,
        isLoadingAccounts,
        isLoading: isEditingPost,

        // Media state
        media: mediaManagement.media,
        mediaType: mediaManagement.mediaType,
        previewUrls: mediaManagement.previewUrls,

        // Tag and link state
        currentTag,
        accountTags,
        currentLinks,
        accountLinks,

        // TikTok auto music state
        tikTokAutoMusicEnabled,

        // Actions
        onAccountSelect,
        onPostTextChange,
        onPostDateTimeChange,
        setShouldSchedule,
        handleSave,

        // Media actions
        setMedia: mediaManagement.setMedia,
        setMediaType: mediaManagement.setMediaType,
        setPreviewUrls: mediaManagement.setPreviewUrls,
        onFileSelect,

        // Tag actions
        setCurrentTag,
        addTagToAccount,
        removeTagFromAccount,
        clearAccountTags,
        getAccountTags,

        // Link actions
        setCurrentLink,
        getCurrentLink,
        addLinkToAccount,
        removeLinkFromAccount,
        clearAccountLinks,
        getAccountLinks,

        // TikTok auto music actions
        onEnableTikTokAutoMusic,
        updateScheduledPost: accountManagement.updateScheduledPost,
    }
}

// Legacy export for backward compatibility
export const usePostEdit = useEditPost
