'use client'

import { Account, useGetAccountsQuery } from '@/entities/account'

export function useSocialMediaAccounts(): {
    accounts: Account[]
    isLoading: boolean
    isError: boolean
} {
    const { data = [], isLoading, isError } = useGetAccountsQuery()

    return {
        accounts: data,
        isLoading,
        isError,
    }
}
