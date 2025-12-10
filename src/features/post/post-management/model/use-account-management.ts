'use client'

import { useCallback, useState } from 'react'

import { Account } from '@/entities/account'
import { PostFormSchema } from '@/entities/post'

import { PostFormService } from '../services/post-form.service'

interface UseAccountManagementProps {
    initialAccounts?: Account[]
    initialScheduledPosts?: PostFormSchema[]
    mainCaption: string
    scheduledTime: any
    accountTags: Record<string, string[]>
    accountLinks: Record<string, string[]>
    tikTokAutoMusicEnabled: Record<string, boolean>
    media?: File[]
    postType?: any
}

export const useAccountManagement = ({
    initialAccounts = [],
    initialScheduledPosts = [],
    mainCaption,
    scheduledTime,
    accountTags,
    accountLinks,
    tikTokAutoMusicEnabled,
    media,
}: UseAccountManagementProps) => {
    const [selectedAccounts, setSelectedAccounts] = useState<Account[]>(initialAccounts)
    const [scheduledPosts, setScheduledPosts] = useState<PostFormSchema[]>(initialScheduledPosts)

    const onAccountSelect = useCallback((account: Account) => {
        setSelectedAccounts((prev) => {
            const isSelected = prev.some((a) => a.id === account.id)
            const newSelectedAccounts = isSelected
                ? prev.filter((a) => a.id !== account.id)
                : [...prev, account]

            setScheduledPosts((prevState) => {
                const selectedAccountIds = newSelectedAccounts.map((acc) => acc.id)
                return prevState.filter((post) => selectedAccountIds.includes(post.account))
            })

            return newSelectedAccounts
        })
    }, [])

    const onPinterestBoardSelect = useCallback((accountId: string, boardId: string) => {
        setScheduledPosts((prev) =>
            prev.map((post) =>
                post.account === accountId
                    ? {
                          ...post,
                          pinterestBoardId: boardId,
                      }
                    : post
            )
        )
    }, [])

    const updateScheduledPosts = useCallback(() => {
        const newPosts = selectedAccounts
            .filter((account) => !scheduledPosts.some((post) => post.account === account.id))
            .map((account) => {
                return PostFormService.createBasePost(
                    account,
                    mainCaption,
                    scheduledTime,
                    accountTags,
                    accountLinks,
                    tikTokAutoMusicEnabled,
                    media
                )
            })

        if (newPosts.length > 0) {
            setScheduledPosts((prev) => [...prev, ...newPosts])
        }
    }, [
        selectedAccounts,
        mainCaption,
        scheduledTime,
        accountTags,
        accountLinks,
        tikTokAutoMusicEnabled,
        media,
        scheduledPosts,
    ])

    const updateScheduledPost = useCallback(
        (accountId: string, updater: (post: PostFormSchema) => PostFormSchema) => {
            setScheduledPosts((prev) =>
                prev.map((post) => (post.account === accountId ? updater(post) : post))
            )
        },
        []
    )

    const resetAccounts = useCallback(() => {
        setSelectedAccounts([])
        setScheduledPosts([])
    }, [])

    return {
        selectedAccounts,
        scheduledPosts,

        setSelectedAccounts,
        setScheduledPosts,
        onAccountSelect,
        onPinterestBoardSelect,
        updateScheduledPosts,
        resetAccounts,
        updateScheduledPost,
    }
}
