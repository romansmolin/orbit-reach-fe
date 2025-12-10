'use client'

import { useEffect, useMemo, useState } from 'react'

import { AlertTriangle, Brush, RefreshCcw } from 'lucide-react'

import { hardReload } from '@/shared/actions/hard-reload'

import { cn } from '@/shared/lib/utils'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { Separator } from '@/shared/ui/separator'

interface ErrorFallbackProps {
    onRetry?: () => void
    title?: string
    description?: string
    error?: Error
    contextLabel?: string
}

export const ErrorFallback = ({
    onRetry,
    title = 'Something went wrong.',
    description = 'We hit an unexpected error. You can try again or perform a hard reload to clear cached state.',
    error,
    contextLabel,
}: ErrorFallbackProps) => {
    const [clearing, setClearing] = useState(false)
    const [clearMessage, setClearMessage] = useState<string | null>(null)

    const errorSummary = useMemo(() => {
        if (!error) return null
        return error.message || 'Unexpected runtime error'
    }, [error])

    useEffect(() => {
        if (error) {
            // eslint-disable-next-line no-console
            console.error('[ErrorFallback] boundary captured error', error)
        }
    }, [error])

    const clearClientStorage = () => {
        window.sessionStorage?.clear?.()
        window.localStorage?.clear?.()
    }

    const clearClientCookies = () => {
        if (typeof document === 'undefined') return

        const cookies = document.cookie.split(';').map((c) => c.trim())
        const domains: string[] = []

        const hostParts = window.location.hostname.split('.')
        for (let i = 0; i < hostParts.length; i++) {
            domains.push(hostParts.slice(i).join('.'))
        }

        cookies.forEach((cookie) => {
            if (!cookie) return
            const eqPos = cookie.indexOf('=')
            const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie
            const trimmed = name.trim()
            // clear common paths/domains
            document.cookie = `${trimmed}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
            document.cookie = `${trimmed}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=`
            domains.forEach((domain) => {
                document.cookie = `${trimmed}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`
            })
        })
    }

    const handleHardReload = async () => {
        setClearing(true)
        setClearMessage(null)

        try {
            if (typeof window !== 'undefined') {
                try {
                    await hardReload()
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error('[ErrorFallback] server action cookie clear failed', err)
                }

                clearClientStorage()
                clearClientCookies()

                setClearMessage('Local state cleared. Reloading…')
                window.location.reload()
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[ErrorFallback] hard reload failed', err)
            setClearMessage('Could not fully clear storage in this browser. Please reload manually.')
            setClearing(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/40 px-6 py-12">
            <Card className="relative max-w-2xl w-full overflow-hidden border border-primary/20 shadow-2xl">
                <div className="pointer-events-none absolute inset-0 opacity-80">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(250,204,21,0.08),transparent_35%)]" />
                </div>

                <CardHeader className="relative flex flex-row items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/30">
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{description}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            <Badge variant="secondary" className="rounded-full border border-border/60">
                                Boundary active {contextLabel ? `· ${contextLabel}` : ''}
                            </Badge>
                            <Badge variant="outline" className="rounded-full">
                                Safe to refresh
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <Separator className="relative" />

                <CardContent className="relative space-y-3">
                    {errorSummary && (
                        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                            <div className="font-medium text-destructive">Error detail</div>
                            <p className="text-destructive/90">{errorSummary}</p>
                        </div>
                    )}
                    {clearMessage && (
                        <div className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-2 text-sm text-primary">
                            {clearMessage}
                        </div>
                    )}
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                        <li>We caught this error before it broke the whole page.</li>
                        <li>
                            Try a soft retry first; if the issue persists, use Hard reload to clear cached state.
                        </li>
                        <li>If this keeps happening, grab a screenshot and let us know.</li>
                    </ul>
                </CardContent>

                <CardFooter className="relative flex flex-wrap gap-3">
                    <Button
                        className={cn('flex-1 min-w-[160px]')}
                        size="lg"
                        onClick={onRetry}
                        variant="default"
                        disabled={!onRetry}
                    >
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Try again
                    </Button>
                    <Button
                        className="flex-1 min-w-[160px]"
                        size="lg"
                        variant="outline"
                        onClick={handleHardReload}
                        disabled={clearing}
                    >
                        <Brush className="mr-2 h-4 w-4" />
                        Hard reload
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
