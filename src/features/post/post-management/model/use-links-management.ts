'use client'

import { useCallback, useState } from 'react'

interface UseLinksManagementProps {
    initialLinks?: Record<string, string[]>
    initialCurrentLinks?: Record<string, string>
}

export const useLinksManagement = ({
    initialLinks = {},
    initialCurrentLinks = {},
}: UseLinksManagementProps = {}) => {
    const [currentLinks, setCurrentLinks] = useState<Map<string, string>>(
        () => new Map(Object.entries(initialCurrentLinks || {}))
    )
    const [accountLinks, setAccountLinks] = useState<Record<string, string[]>>(initialLinks)

    const addLinkToAccount = useCallback((accountId: string, link: string) => {
        const trimmedLink = link.trim()
        if (!trimmedLink) {
            return
        }

        setAccountLinks((prev) => {
            const existingLinks = prev[accountId] || []
            const isDuplicate = existingLinks.some(
                (existingLink) => existingLink.toLowerCase() === trimmedLink.toLowerCase()
            )

            if (isDuplicate) {
                return prev
            }

            return {
                ...prev,
                [accountId]: [...existingLinks, trimmedLink],
            }
        })

        setCurrentLinks((prev) => {
            const next = new Map(prev)
            next.set(accountId, '')
            return next
        })
    }, [])

    const removeLinkFromAccount = useCallback((accountId: string, linkIndex: number) => {
        setAccountLinks((prev) => ({
            ...prev,
            [accountId]: (prev[accountId] || []).filter((_, index) => index !== linkIndex),
        }))
    }, [])

    const clearAccountLinks = useCallback((accountId: string) => {
        setAccountLinks((prev) => ({
            ...prev,
            [accountId]: [],
        }))
        setCurrentLinks((prev) => {
            const next = new Map(prev)
            next.set(accountId, '')
            return next
        })
    }, [])

    const setCurrentLink = useCallback((accountId: string, link: string) => {
        setCurrentLinks((prev) => {
            const next = new Map(prev)
            next.set(accountId, link)
            return next
        })
    }, [])

    const getAccountLinks = useCallback(
        (accountId: string) => {
            return accountLinks[accountId] || []
        },
        [accountLinks]
    )

    const getCurrentLink = useCallback(
        (accountId: string) => currentLinks.get(accountId) || '',
        [currentLinks]
    )

    const resetLinks = useCallback(() => {
        setCurrentLinks(new Map())
        setAccountLinks({})
    }, [])

    return {
        currentLinks,
        accountLinks,

        getCurrentLink,
        setCurrentLink,
        addLinkToAccount,
        removeLinkFromAccount,
        clearAccountLinks,
        getAccountLinks,
        resetLinks,
    }
}
