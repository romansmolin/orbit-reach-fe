import { useMemo } from 'react'

import { Account, AccountPlatform, useSocialMediaAccounts } from '@/entities/account'
import { PostFormSchema } from '@/entities/post'

interface UseInstagramPostSettingsParams {
    account: Account
    scheduledPosts: PostFormSchema[]
    updateScheduledPost?: (accountId: string, updater: (post: PostFormSchema) => PostFormSchema) => void
}

export const useInstagramPostSettings = ({
    account,
    scheduledPosts,
    updateScheduledPost,
}: UseInstagramPostSettingsParams) => {
    const { accounts: socialAccounts, isLoading: isAccountsLoading } = useSocialMediaAccounts()

    const scheduledPost = useMemo(
        () => scheduledPosts.find((post) => post.account === account.id),
        [scheduledPosts, account.id]
    )

    const instagramFacebookPageId = scheduledPost?.instagramFacebookPageId ?? ''

    const facebookPages = useMemo(
        () => socialAccounts.filter((item) => item.platform === AccountPlatform.facebook),
        [socialAccounts]
    )

    const handleFacebookPageChange = (accountId?: string) => {
        if (!updateScheduledPost || !scheduledPost) {
            return
        }

        updateScheduledPost(account.id, (prevPost) => ({
            ...prevPost,
            instagramFacebookPageId: accountId || undefined,
        }))
    }

    return {
        instagramFacebookPageId,
        facebookPages,
        isFacebookPagesLoading: isAccountsLoading,
        handleFacebookPageChange,
    }
}
