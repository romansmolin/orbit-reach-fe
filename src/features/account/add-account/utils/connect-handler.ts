import { AccountPlatform } from '@/entities/account'

import { getFbLoginUrl } from './get-fb-login-url'
import { getInstLoginUrl } from './get-inst-login-url'
import { getLinkedinLoginUrl } from './get-linkedin-login-url'
import { getPinterestAuthLink } from './get-pinterest-auth-link'
import { getThreadsLoginUrl } from './get-threads-login-url'
import { getTikTokLoginUrl } from './get-tiktok-login-url'
import { getXLoginUrl } from './get-x-login-url'
import { getYouTubeLoginUrl } from './get-youtube-login-url'

const connectorMethods: Partial<Record<AccountPlatform, () => Promise<string>>> = {
    [AccountPlatform.facebook]: () => getFbLoginUrl(),
    [AccountPlatform.pinterest]: () => getPinterestAuthLink(),
    [AccountPlatform.x]: () => getXLoginUrl(),
    [AccountPlatform.youtube]: () => getYouTubeLoginUrl(),
    [AccountPlatform.linkedin]: () => getLinkedinLoginUrl(),
    [AccountPlatform.instagram]: () => getInstLoginUrl(),
    [AccountPlatform.threads]: () => getThreadsLoginUrl(),
    [AccountPlatform.tiktok]: () => getTikTokLoginUrl(),
    // Bluesky handled separately due to distinct flow
}

export const handleConnect = async (platform: AccountPlatform) => {
    const connector = connectorMethods[platform]

    if (!connector) {
        console.warn(`No connector configured for platform ${platform}; handle it separately.`)
        return
    }

    try {
        const loginUrl = await connector()

        console.log('lol: ', loginUrl)
        window.location.href = loginUrl
    } catch (err: unknown) {
        console.error(`Failed to initiate ${platform} OAuth`, err)
    }
}
