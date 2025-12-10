import { getOAuthStateToken } from './get-oauth-state'

// https://www.linkedin.com/developers/tools/oauth/redirect
export const getLinkedinLoginUrl = async (reconnect = false): Promise<string> => {
    const platform = 'linkedin'

    const scopes = ['w_member_social', 'openid', 'profile', 'email']

    const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URL}`

    const state = await getOAuthStateToken(platform, reconnect)

    return (
        `https://www.linkedin.com/oauth/v2/authorization?` +
        `client_id=${process.env.NEXT_PUBLIC_LINKEDIN_APP_ID}` +
        `&redirect_uri=${redirectUrl}` +
        `&response_type=code` +
        `&scope=${scopes.join(',')}` +
        `&state=${encodeURIComponent(state)}`
    )
}
