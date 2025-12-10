'use client'

import { useEffect } from 'react'

import { ErrorFallback } from '@/shared/components/error-fallback'

export default function LandingError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // eslint-disable-next-line no-console
        console.error('[LandingError] boundary', error)
    }, [error])

    return <ErrorFallback contextLabel="Landing" error={error} onRetry={reset} />
}
