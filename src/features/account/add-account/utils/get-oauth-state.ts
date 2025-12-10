import api from '@/shared/api/axios'

interface OAuthStateResponse {
    state: string
}

interface OAuthStateRequest {
    platform: string
    reconnect?: boolean
    metadata?: Record<string, unknown>
}

export const getOAuthStateToken = async (
    platform: string,
    reconnect = false,
    metadata?: Record<string, unknown>
): Promise<string> => {
    try {
        const { data } = await api.post<OAuthStateResponse>('/oauth/state', {
            platform,
            reconnect,
            metadata,
        } as OAuthStateRequest)

        if (!data?.state) {
            throw new Error('Missing state token')
        }

        return data.state
    } catch (error) {
        console.error(`Failed to fetch OAuth state for ${platform}`, error)
        throw new Error('Unable to initialize the connection. Please try again.')
    }
}
