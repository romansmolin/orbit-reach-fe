import { getOAuthStateToken } from './get-oauth-state'

export const getTikTokLoginUrl = async (reconnect = false): Promise<string> => {
    const scopes = ['user.info.basic', 'video.publish', 'video.upload']

    if (!process.env.NEXT_PUBLIC_API_URL || !process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URL) {
        console.warn('Missing env variables: check NEXT_PUBLIC_API_URL and NEXT_PUBLIC_TIKTOK_REDIRECT_URL')
    }

    const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URL}`

    const state = await getOAuthStateToken('tiktok', reconnect)

    return (
        `https://www.tiktok.com/v2/auth/authorize/?` +
        `client_key=${process.env.NEXT_PUBLIC_TIKTOK_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl || '')}` +
        `&scope=${scopes.join(',')}` +
        `&state=${encodeURIComponent(state)}` +
        `&response_type=code`
    )
}
