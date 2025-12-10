import { getOAuthStateToken } from './get-oauth-state'

export const getThreadsLoginUrl = async (reconnect = false): Promise<string> => {
    const scopes = [
        'threads_basic',
        'threads_content_publish',
        'threads_read_replies',
        'threads_manage_replies',
        'threads_manage_insights',
        'threads_manage_mentions',
    ]
    const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_THREADS_REDIRECT_URL}`

    const state = await getOAuthStateToken('threads', reconnect)

    return (
        `https://threads.net/oauth/authorize?` +
        `client_id=${process.env.NEXT_PUBLIC_THREADS_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl || '')}` +
        `&scope=${scopes.join(',')}` +
        `&state=${encodeURIComponent(state)}` +
        `&response_type=code`
    )
}
