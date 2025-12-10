import React from 'react'

import { cookies } from 'next/headers'

import { Account, AccountCard } from '@/entities/account'
import { DeleteAccountButton } from '@/features/account/delete-account'
import api from '@/shared/api/axios'
import { IllustrationInternetConnection } from '@/shared/assets/illustration'

const AccountsGrid = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    const { data } = await api.get('/accounts', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const { accounts } = data

    if (accounts.length === 0) {
        return (
            <div className="size-full flex justify-center items-center flex-col gap-5">
                <IllustrationInternetConnection className="fill-primary size-60" />
                <p className="text-primary max-w-md text-center">
                    No accounts connected yet. Connect your social media channels to start your campaign.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account: Account) => (
                <AccountCard
                    key={account.id}
                    account={account}
                    deleteButton={<DeleteAccountButton accountId={account.id} provider={account.platform} />}
                />
            ))}
        </div>
    )
}

export default AccountsGrid
