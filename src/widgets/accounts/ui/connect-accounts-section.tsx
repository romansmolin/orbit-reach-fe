import { cookies } from 'next/headers'

import ConnectAccountsSectionClient from './connect-accounts-section.client'

const ConnectAccountsSection = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) {
        return null
    }

    return <ConnectAccountsSectionClient />
}

export default ConnectAccountsSection
