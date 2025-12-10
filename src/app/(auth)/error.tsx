'use client'

import { useEffect } from 'react'

import { ErrorFallback } from '@/shared/components/error-fallback'

export default function AuthError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // eslint-disable-next-line no-console
        console.error('[AuthError] boundary', error)
    }, [error])

    return <ErrorFallback contextLabel="Auth" error={error} onRetry={reset} />
}
