'use client'

import { useEffect } from 'react'

import { ErrorFallback } from '@/shared/components/error-fallback'

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // eslint-disable-next-line no-console
        console.error('[DashboardError] boundary', error)
    }, [error])

    return <ErrorFallback contextLabel="Dashboard" error={error} onRetry={reset} />
}
