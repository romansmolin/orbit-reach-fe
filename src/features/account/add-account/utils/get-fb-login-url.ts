import { getOAuthStateToken } from './get-oauth-state'

export const getFbLoginUrl = async (reconnect = false): Promise<string> => {
    const scopes = [
        'pages_show_list',
        'pages_read_engagement',
        'pages_manage_posts',
        'public_profile',
        'business_management',
    ]

    if (!process.env.NEXT_PUBLIC_API_URL || !process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URL) {
        console.warn(
            'Missing env variables: check NEXT_PUBLIC_API_URL and NEXT_PUBLIC_FACEBOOK_REDIRECT_URL'
        )
    }

    const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URL}`

    const state = await getOAuthStateToken('facebook', reconnect)

    return (
        `https://www.facebook.com/v18.0/dialog/oauth?` +
        `client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl || '')}` +
        `&scope=${scopes.join(',')}` +
        `&state=${encodeURIComponent(state)}` +
        `&response_type=code`
    )
}
