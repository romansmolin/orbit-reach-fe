import React from 'react'

import { AccountsGrid, ConnectAccountsSection } from '@/widgets/accounts'

const AccountsPage = () => {
    return (
        <>
            <h1 className="text-2xl font-bold">Connect Your Social Media Accounts</h1>
            <ConnectAccountsSection />
            <h2 className="text-2xl font-bold">Accounts</h2>
            <AccountsGrid />
        </>
    )
}

export default AccountsPage
