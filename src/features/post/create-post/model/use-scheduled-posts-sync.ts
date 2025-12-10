import { useEffect } from 'react'

import { Account } from '@/entities/account'
import { PostType, ScheduledDate } from '@/entities/post/model/post.types'

interface ScheduledPostsSyncParams {
    selectedAccounts: Account[]
    mainCaption: string
    media: File[] | undefined
    postType: PostType
    scheduledTime: ScheduledDate
    accountTags: Record<string, string[]>
    accountLinks: Record<string, string[]>
    tikTokAutoMusicEnabled: Record<string, boolean>
    updateScheduledPosts: () => void
}

export const useScheduledPostsSync = ({
    selectedAccounts,
    mainCaption,
    media,
    postType,
    scheduledTime,
    accountTags,
    accountLinks,
    tikTokAutoMusicEnabled,
    updateScheduledPosts,
}: ScheduledPostsSyncParams) => {
    useEffect(() => {
        updateScheduledPosts()
    }, [
        accountLinks,
        accountTags,
        mainCaption,
        media,
        postType,
        scheduledTime,
        selectedAccounts,
        tikTokAutoMusicEnabled,
        updateScheduledPosts,
    ])
}
