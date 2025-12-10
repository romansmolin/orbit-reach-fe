import { Account, AccountPlatform } from '@/entities/account'
import { PostType, ScheduledDate } from '@/entities/post'
import { PostFormSchema } from '@/entities/post/model/post-form-schema'

export interface CopiedPostData {
    postId: string
    type: PostType
    mainCaption?: string
    targets: Array<{
        platform: AccountPlatform
        status: string
        socialAccountId: string
        text: string
        title?: string
        pinterestBoardId?: string
        instagramFacebookPageId?: string
        errorMessage?: string
        postId: string
    }>
    media: Array<{
        url: string
        type: string
        order: number
    }>
    scheduledTime: string
}

export const parseCopiedPostData = (encodedData: string): CopiedPostData | null => {
    try {
        const decodedData = decodeURIComponent(encodedData)
        return JSON.parse(decodedData) as CopiedPostData
    } catch (error) {
        console.error('Failed to parse copied post data:', error)
        return null
    }
}

export const convertCopiedDataToFormData = (
    copiedData: CopiedPostData,
    accounts: Account[],
    options?: {
        preferredTimezone?: string
    }
): {
    postType: PostType
    mainCaption: string
    selectedAccounts: Account[]
    scheduledPosts: PostFormSchema[]
    scheduledTime: ScheduledDate
    shouldSchedule: boolean
    previewUrls: string[]
    mediaType: 'image' | 'video'
} => {
    // Convert post type
    const postType = copiedData.type

    // Set main caption
    const mainCaption = copiedData.mainCaption || ''

    const preferredTimezone = options?.preferredTimezone
    const parsedScheduledTime = parseScheduledTime(copiedData.scheduledTime, preferredTimezone)

    // Find and select accounts based on targets
    const selectedAccounts = accounts.filter((account) =>
        copiedData.targets.some((target) => target.socialAccountId === account.id)
    )

    // Create scheduled posts from targets
    const scheduledPosts: PostFormSchema[] = copiedData.targets.map((target) => {
        let post: PostFormSchema = {
            account: target.socialAccountId,
            platform: target.platform,
            text: target.text,
            scheduledDate: { ...parsedScheduledTime },
            mainCaption: mainCaption,
        }

        if (
            target.platform === AccountPlatform.facebook ||
            target.platform === AccountPlatform.pinterest ||
            target.platform === AccountPlatform.tiktok
        ) {
            post = {
                ...post,
                title: target.title || '',
            }

            if (target.platform === AccountPlatform.pinterest) {
                post = {
                    ...post,
                    pinterestBoardId: target.pinterestBoardId || '',
                }
            }
        }

        if (target.platform === AccountPlatform.instagram && target.instagramFacebookPageId) {
            post = {
                ...post,
                instagramFacebookPageId: target.instagramFacebookPageId,
            }
        }

        return post
    })

    const scheduledTime: ScheduledDate = { ...parsedScheduledTime }
    const shouldSchedule = copiedData.scheduledTime !== ''

    const previewUrls = copiedData.media?.map((media) => media.url) || []

    const mediaType =
        copiedData.media && copiedData.media.length > 0
            ? copiedData.media[0].type.startsWith('video')
                ? 'video'
                : 'image'
            : 'image'

    return {
        postType,
        mainCaption,
        selectedAccounts,
        scheduledPosts,
        scheduledTime,
        shouldSchedule,
        previewUrls,
        mediaType,
    }
}

const parseScheduledTime = (scheduledTimeString: string, fallbackTimezone?: string): ScheduledDate => {
    try {
        const date = new Date(scheduledTimeString)
        if (Number.isNaN(date.getTime())) {
            throw new Error('Invalid date')
        }
        const time = date.toTimeString().slice(0, 5) // Extract HH:mm
        return {
            date,
            time,
            ...(fallbackTimezone ? { timezone: fallbackTimezone } : {}),
        }
    } catch (error) {
        console.error('Failed to parse scheduled time:', error)
        const fallbackDate = new Date()
        return {
            date: fallbackDate,
            time: '00:00',
            ...(fallbackTimezone ? { timezone: fallbackTimezone } : {}),
        }
    }
}
