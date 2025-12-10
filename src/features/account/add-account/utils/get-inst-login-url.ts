import { getOAuthStateToken } from './get-oauth-state'

export const getInstLoginUrl = async (reconnect = false): Promise<string> => {
    const platform = 'instagram'

    const instScopes = [
        'instagram_business_content_publish',
        'instagram_business_basic',
        'instagram_business_manage_insights',
    ]
    const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI}`

    console.log('redirectUrl: ', redirectUrl)

    const state = await getOAuthStateToken(platform, reconnect)

    return (
        `https://api.instagram.com/oauth/authorize?` +
        `client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&response_type=code` +
        `&scope=${instScopes.join(',')}` +
        `&state=${encodeURIComponent(state)}`
    )
    // return (
    //     `https://www.facebook.com/v18.0/dialog/oauth?` +
    //     `client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}` +
    //     `&redirect_uri=${encodeURIComponent(redirectUrl || '')}` +
    //     `&scope=${scopes.join(',')}` +
    //     `&state=${encodeURIComponent(JSON.stringify({ userId, platform, reconnect }))}` +
    //     `&response_type=code`
    // )
}
