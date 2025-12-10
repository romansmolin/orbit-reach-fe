export const TOKEN_COOKIE_NAME = 'token'
export const TOKEN_EXPIRY_STORAGE_KEY = 'tokenExpiresAt'
export const TOKEN_LIFETIME_MS = 24 * 60 * 60 * 1000 // 24 hours

const deleteCookie = (name: string) => {
    if (typeof document === 'undefined') return
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}

export const rememberTokenExpiry = () => {
    if (typeof window === 'undefined') return
    const expiresAt = Date.now() + TOKEN_LIFETIME_MS
    window.localStorage?.setItem(TOKEN_EXPIRY_STORAGE_KEY, String(expiresAt))
}

export const clearAuthSession = (options?: { redirect?: boolean; redirectPath?: string }) => {
    if (typeof window !== 'undefined') {
        window.localStorage?.removeItem(TOKEN_EXPIRY_STORAGE_KEY)
    }
    deleteCookie(TOKEN_COOKIE_NAME)

    if (options?.redirect !== false && typeof window !== 'undefined') {
        const targetPath = options?.redirectPath ?? '/auth'
        const isAlreadyOnTarget =
            targetPath === '/' ? window.location.pathname === '/' : window.location.pathname.startsWith(targetPath)

        if (!isAlreadyOnTarget) {
            window.location.href = targetPath
        }
    }
}

export const getStoredExpiry = (): number | null => {
    if (typeof window === 'undefined') return null
    const stored = window.localStorage?.getItem(TOKEN_EXPIRY_STORAGE_KEY)
    if (!stored) return null
    const parsed = Number(stored)
    return Number.isFinite(parsed) ? parsed : null
}

export const logoutAndRedirectHome = () => {
    clearAuthSession({ redirectPath: '/' })
}
