import { getOAuthStateToken } from './get-oauth-state'

export const getYouTubeLoginUrl = async (reconnect = false): Promise<string> => {
    const scopes = [
        'https://www.googleapis.com/auth/youtube.upload',
        'https://www.googleapis.com/auth/youtube.readonly',
    ]

    if (!process.env.NEXT_PUBLIC_API_URL || !process.env.NEXT_PUBLIC_YOUTUBE_REDIRECT_URL) {
        console.warn(
            'Missing env variables: check NEXT_PUBLIC_API_URL and NEXT_PUBLIC_YOUTUBE_REDIRECT_URL'
        )
    }

    const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_YOUTUBE_REDIRECT_URL}`
    const state = await getOAuthStateToken('youtube', reconnect)
    return (
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${redirectUrl}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}` +
        `&state=${encodeURIComponent(state)}` +
        `&response_type=code` +
        `&access_type=offline` +
        `&prompt=consent`
    )
}
