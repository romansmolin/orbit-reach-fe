'use client'

import React, { useMemo } from 'react'

import { Loader2 } from 'lucide-react'

import { Account, AccountAvatar, getDisableMessage, isAccountDisabled } from '@/entities/account'
import { MediaType, PostType } from '@/entities/post'
import { GenericCard } from '@/shared/components/generic-card'
import { cn } from '@/shared/lib/utils'

interface SelectAccountsProps {
    onAccountSelect: (selectAccount: Account) => void
    socialMediaAccounts: Account[]
    isLoading: boolean
    selectedAccounts: Partial<Account>[]
    mediaType?: MediaType
    postType?: PostType
    hasMedia?: boolean
    gridClassName?: string
    isDisabled?: boolean
    disabledMessage?: string
}

export const SelectAccounts = ({
    socialMediaAccounts,
    isLoading,
    selectedAccounts,
    onAccountSelect,
    gridClassName = '',
    mediaType,
    postType,
    hasMedia,
    isDisabled = false,
    disabledMessage,
}: SelectAccountsProps) => {
    const selectedIds = useMemo(() => new Set(selectedAccounts.map((a) => a.id)), [selectedAccounts])

    if (isLoading) {
        return (
            <GenericCard
                cardContainerClassName="rounded-md border border-primary h-full p-4"
                cardTitle={<span className="font-bold text-primary dark:text-white">Select Accounts</span>}
                cardContent={
                    <div className="flex items-center justify-center">
                        <Loader2 className="size-12 animate-spin text-primary" />
                    </div>
                }
            />
        )
    }

    const selectAccountContent = (
        <div
            className={cn(
                'grid gap-2',
                gridClassName
                    ? gridClassName
                    : 'grid-cols-5 gap-y-5 xs:grid-cols-6 sm:grid-cols-8  md:grid-cols-9 lg:grid-cols-12'
            )}
        >
            {socialMediaAccounts.map((account) => {
                const disableContext = {
                    mediaType,
                    postType,
                    hasMedia,
                    platform: account.platform,
                }
                const accountDisabled = isAccountDisabled(account.platform, disableContext)
                const disabled = accountDisabled || isDisabled
                const disableMessage = accountDisabled
                    ? getDisableMessage(account.platform, disableContext)
                    : isDisabled
                      ? disabledMessage
                      : undefined

                return (
                    <AccountAvatar
                        key={account.id}
                        disabled={disabled}
                        disableMessage={disableMessage}
                        isSelected={selectedIds.has(account.id)}
                        picture={account.picture}
                        platform={account.platform}
                        username={account.username}
                        onClick={isDisabled ? undefined : () => onAccountSelect(account)}
                    />
                )
            })}
        </div>
    )

    return (
        <GenericCard
            cardContainerClassName="rounded-md border border-primary p-4 flex flex-col gap-4"
            cardContent={selectAccountContent}
            cardTitle={<span className="font-bold text-primary dark:text-white">Select Accounts</span>}
        />
    )
}
