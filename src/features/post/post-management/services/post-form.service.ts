import { Account, AccountPlatform } from '@/entities/account'
import {
    shouldIncludeLinks,
    shouldIncludeTags,
    shouldIncludeTitle,
} from '@/entities/account/const/account-platform-config'
import { PostFormSchema } from '@/entities/post'

export interface PostFormData {
    account: string
    platform: AccountPlatform
    text: string
    scheduledDate: any
    mainCaption: string
    threadsReplies?: string[]
    tags?: string[]
    links?: string[]
    title?: string
    pinterestBoardId?: string
    isAutoMusicEnabled?: boolean
    media?: File[]
    instagramFacebookPageId?: string
}

export class PostFormService {
    static createBasePost(
        account: Account,
        mainCaption: string,
        scheduledDate: any,
        accountTags: Record<string, string[]>,
        accountLinks: Record<string, string[]>,
        tikTokAutoMusicEnabled: Record<string, boolean>,
        media?: File[]
    ): PostFormData {
        const accountTagsForPost = accountTags[account.id] || []
        const accountLinksForPost = accountLinks[account.id] || []

        const basePost: PostFormData = {
            account: account.id,
            platform: account.platform as AccountPlatform,
            text: mainCaption || '',
            scheduledDate,
            mainCaption: mainCaption || '',
            threadsReplies: account.platform === AccountPlatform.threads ? [] : undefined,
            tags: shouldIncludeTags(account.platform as AccountPlatform, accountTagsForPost)
                ? accountTagsForPost
                : undefined,
            links: shouldIncludeLinks(account.platform as AccountPlatform, accountLinksForPost)
                ? accountLinksForPost
                : undefined,
        }

        // Add platform-specific fields
        if (shouldIncludeTitle(account.platform as AccountPlatform)) {
            basePost.title = ''
        }

        if (account.platform === AccountPlatform.pinterest) {
            basePost.pinterestBoardId = ''
        }

        if (
            account.platform === AccountPlatform.tiktok &&
            tikTokAutoMusicEnabled[account.id] !== undefined
        ) {
            basePost.isAutoMusicEnabled = tikTokAutoMusicEnabled[account.id]
        }

        if (media && media.length > 0) {
            basePost.media = media
        }

        return basePost
    }

    static updatePostWithTagsAndLinks(
        post: PostFormSchema,
        accountTags: Record<string, string[]>,
        accountLinks: Record<string, string[]>,
        tikTokAutoMusicEnabled: Record<string, boolean>
    ): PostFormSchema {
        const accountTagsForPost = accountTags[post.account] || []
        const accountLinksForPost = accountLinks[post.account] || []

        return {
            ...post,
            tags: shouldIncludeTags(post.platform, accountTagsForPost) ? accountTagsForPost : undefined,
            links: shouldIncludeLinks(post.platform, accountLinksForPost)
                ? accountLinksForPost
                : undefined,
            ...(post.platform === AccountPlatform.tiktok &&
                tikTokAutoMusicEnabled[post.account] !== undefined && {
                    isAutoMusicEnabled: tikTokAutoMusicEnabled[post.account],
                }),
        }
    }

    static preparePostsForSubmission(
        scheduledPosts: PostFormSchema[],
        accountTags: Record<string, string[]>,
        accountLinks: Record<string, string[]>,
        tikTokAutoMusicEnabled: Record<string, boolean>
    ): PostFormSchema[] {
        return scheduledPosts.map((post) =>
            this.updatePostWithTagsAndLinks(post, accountTags, accountLinks, tikTokAutoMusicEnabled)
        )
    }
}
