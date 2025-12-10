import { getOAuthStateToken } from './get-oauth-state'

const toBase64Url = (buffer: ArrayBuffer | Uint8Array) => {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer)
    const base64 =
        typeof globalThis.btoa === 'function'
            ? (() => {
                  let binary = ''
                  bytes.forEach((b) => {
                      binary += String.fromCharCode(b)
                  })
                  return globalThis.btoa(binary)
              })()
            : Buffer.from(bytes).toString('base64')

    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const getCrypto = () => {
    if (typeof globalThis.crypto === 'undefined') {
        throw new Error('Crypto API is not available in this environment')
    }
    return globalThis.crypto
}

const generateCodeVerifier = () => {
    const cryptoObj = getCrypto()
    const randomBytes = new Uint8Array(32)
    cryptoObj.getRandomValues(randomBytes)
    return toBase64Url(randomBytes)
}

const createCodeChallenge = async (verifier: string) => {
    const cryptoObj = getCrypto()
    const data = new TextEncoder().encode(verifier)
    const digest = await cryptoObj.subtle.digest('SHA-256', data)
    return toBase64Url(digest)
}

export const getXLoginUrl = async (reconnect = false): Promise<string> => {
    const scopes = ['tweet.read', 'tweet.write', 'users.read', 'offline.access']
    const codeVerifier = generateCodeVerifier()
    const codeChallenge = await createCodeChallenge(codeVerifier)

    if (
        !process.env.NEXT_PUBLIC_API_URL ||
        !process.env.NEXT_PUBLIC_X_REDIRECT_URL ||
        !process.env.NEXT_PUBLIC_X_ID
    ) {
        console.warn('Missing env variables: check NEXT_PUBLIC_API_URL and NEXT_PUBLIC_X_REDIRECT_URL')
    }

    const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_X_REDIRECT_URL}`

    const state = await getOAuthStateToken('x', reconnect, { codeVerifier })

    return (
        `https://twitter.com/i/oauth2/authorize?` +
        `response_type=code` +
        `&client_id=${process.env.NEXT_PUBLIC_X_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}` +
        `&state=${encodeURIComponent(state)}` +
        `&code_challenge=${codeChallenge}` +
        `&code_challenge_method=S256`
    )
}
