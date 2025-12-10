'use client'

import { useCallback, useState } from 'react'

interface UseTagsManagementProps {
    initialTags?: Record<string, string[]>
    initialCurrentTag?: string
}

export const useTagsManagement = ({
    initialTags = {},
    initialCurrentTag = '',
}: UseTagsManagementProps = {}) => {
    const [currentTag, setCurrentTag] = useState<string>(initialCurrentTag)
    const [accountTags, setAccountTags] = useState<Record<string, string[]>>(initialTags)

    const addTagToAccount = useCallback((accountId: string, tag: string) => {
        const trimmedTag = tag.trim()
        if (!trimmedTag) {
            return
        }

        setAccountTags((prev) => {
            const existingTags = prev[accountId] || []
            const isDuplicate = existingTags.some(
                (existingTag) => existingTag.toLowerCase() === trimmedTag.toLowerCase()
            )

            if (isDuplicate) {
                return prev
            }

            return {
                ...prev,
                [accountId]: [...existingTags, trimmedTag],
            }
        })

        setCurrentTag('')
    }, [])

    const removeTagFromAccount = useCallback((accountId: string, tagIndex: number) => {
        setAccountTags((prev) => ({
            ...prev,
            [accountId]: (prev[accountId] || []).filter((_, index) => index !== tagIndex),
        }))
    }, [])

    const clearAccountTags = useCallback((accountId: string) => {
        setAccountTags((prev) => ({
            ...prev,
            [accountId]: [],
        }))
    }, [])

    const getAccountTags = useCallback(
        (accountId: string) => {
            return accountTags[accountId] || []
        },
        [accountTags]
    )

    const resetTags = useCallback(() => {
        setCurrentTag('')
        setAccountTags({})
    }, [])

    return {
        currentTag,
        accountTags,
        setCurrentTag,
        addTagToAccount,
        removeTagFromAccount,
        clearAccountTags,
        getAccountTags,
        resetTags,
    }
}
