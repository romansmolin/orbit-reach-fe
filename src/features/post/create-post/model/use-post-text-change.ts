import { useCallback } from 'react'

import { AccountPlatform } from '@/entities/account'
import { PostFormSchema } from '@/entities/post'
import { PostFormService } from '@/features/post/post-management/services/post-form.service'

interface PostTextChangeParams {
    setMainCaption: (caption: string) => void
    setScheduledPosts: (updater: (prev: PostFormSchema[]) => PostFormSchema[]) => void
    accountTags: Record<string, string[]>
    accountLinks: Record<string, string[]>
    tikTokAutoMusicEnabled: Record<string, boolean>
}

export const usePostTextChange = ({
    setMainCaption,
    setScheduledPosts,
    accountTags,
    accountLinks,
    tikTokAutoMusicEnabled,
}: PostTextChangeParams) => {
    return useCallback(
        (
            text: string,
            accountId: string,
            platform?: AccountPlatform,
            title?: string,
            threadsReplies?: string[]
        ) => {
            if (!platform) {
                setMainCaption(text)
                setScheduledPosts((prev) =>
                    prev.map((post) =>
                        PostFormService.updatePostWithTagsAndLinks(
                            { ...post, text },
                            accountTags,
                            accountLinks,
                            tikTokAutoMusicEnabled
                        )
                    )
                )
                return
            }

            setScheduledPosts((prev) =>
                prev.map((post) => {
                    if (post.account !== accountId) {
                        return post
                    }

                    const updatedPost: PostFormSchema = {
                        ...post,
                        text,
                        ...(typeof title !== 'undefined' ? { title } : {}),
                        ...(platform === AccountPlatform.threads && typeof threadsReplies !== 'undefined'
                            ? { threadsReplies }
                            : {}),
                    }

                    return PostFormService.updatePostWithTagsAndLinks(
                        updatedPost,
                        accountTags,
                        accountLinks,
                        tikTokAutoMusicEnabled
                    )
                })
            )
        },
        [accountLinks, accountTags, setMainCaption, setScheduledPosts, tikTokAutoMusicEnabled]
    )
}
