import React, { JSX } from 'react'

import { GenericCard } from '@/shared/components/generic-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'

import { Account } from '../model/account.interface'

import AccountPlatformBadge from './account-platform-badge'

const formatConnectedTime = (dateString: string) => {
    const date = new Date(dateString)

    date.toLocaleDateString('en-GB').replace(/\//g, '.')
    return date.toLocaleDateString('en-GB').replace(/\//g, '.')
}

interface AccountCardProps {
    account: Account
    deleteButton?: JSX.Element
}

const AccountCard = ({ account, deleteButton }: AccountCardProps) => {
    const cardHeader = (
        <>
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

            <div className="flex gap-4 items-start pt-1">
                <Avatar className="rounded-xl shadow-sm size-15">
                    <AvatarImage
                        alt={account.username}
                        className="w-full h-full rounded-xl object-cover"
                        src={account.picture}
                    />
                    <AvatarFallback className="flex items-center justify-center text-white h-full bg-primary rounded-xl">
                        {account.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-semibold text-lg truncate">{account.username}</h3>
                    <AccountPlatformBadge platform={account.platform} />
                </div>
            </div>
        </>
    )

    const cardContent = (
        <div className="flex flex-col">
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                Connected on {formatConnectedTime(account.connectedAt)}
            </div>
        </div>
    )

    const cardFooter = deleteButton && <div className="flex w-full">{deleteButton}</div>

    return (
        <GenericCard
            key={account.id}
            cardContainerClassName="group relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 gap-3 p-6"
            cardContent={cardContent}
            cardFooter={cardFooter}
            cardHeader={cardHeader}
        />
    )
}

export default AccountCard
