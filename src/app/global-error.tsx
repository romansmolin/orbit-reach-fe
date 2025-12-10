'use client'

import { useEffect } from 'react'

import { Be_Vietnam_Pro } from 'next/font/google'

import { ErrorFallback } from '@/shared/components/error-fallback'

import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({
    variable: '--font-vietnam-pro',
    subsets: ['latin'],
    weight: ['400', '500'],
})

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        // eslint-disable-next-line no-console
        console.error('[GlobalError] unhandled error', error)
    }, [error])

    return (
        <html suppressHydrationWarning className={beVietnamPro.variable} lang="en">
            <body className="antialiased bg-card text-foreground">
                <ErrorFallback contextLabel="App" error={error} onRetry={reset} />
            </body>
        </html>
    )
}
