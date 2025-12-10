import { getOAuthStateToken } from './get-oauth-state'

export const getPinterestAuthLink = async (reconnect = false) => {
    const scopes = [
        'boards:read',
        'boards:read_secret',
        'pins:write',
        'boards:write',
        'user_accounts:read',
        'pins:read',
        'boards:write_secret',
    ]

    if (
        !process.env.NEXT_PUBLIC_PINTEREST_REDIRECT_URL ||
        !process.env.NEXT_PUBLIC_PINTEREST_ID ||
        !process.env.NEXT_PUBLIC_API_URL
    ) {
        console.warn(
            'Missing env variables: check NEXT_PUBLIC_API_URL, NEXT_PUBLIC_PINTEREST_ID and NEXT_PUBLIC_PINTEREST_REDIRECT_URL'
        )
    }

    const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_PINTEREST_REDIRECT_URL}`

    const state = await getOAuthStateToken('pinterest', reconnect)

    return (
        `https://www.pinterest.com/oauth/?` +
        `client_id=${process.env.NEXT_PUBLIC_PINTEREST_ID}&` +
        `redirect_uri=${encodeURIComponent(redirectUrl)}&` +
        `response_type=code&` +
        `scope=${scopes.join(',')}&` +
        `state=${encodeURIComponent(state)}`
    )
}
