'use client'

import React, { useEffect, useMemo, useState } from 'react'

import { ThumbsUp } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import { ERROR_MESSAGES } from '@/shared/api/error-messages'
import { GenericDialog } from '@/shared/components'
import { Button } from '@/shared/ui/button'

const ErrorDialog = () => {
    const [error, setError] = useState(false)
    const [platform, setPlatform] = useState('')
    const [message, setMessage] = useState('')
    const [accounts, setAccounts] = useState<string[]>([])
    const [current, setCurrent] = useState<number | null>(null)
    const [limit, setLimit] = useState<number | null>(null)
    const [requested, setRequested] = useState<number | null>(null)

    const searchParams = useSearchParams()

    useEffect(() => {
        const errorParam = searchParams.get('error')
        if (errorParam) {
            setError(true)
            // @ts-ignore
            setMessage(ERROR_MESSAGES[errorParam.toUpperCase()] || ERROR_MESSAGES.UNKNOWN_ERROR)
        }

        const errorPlatform = searchParams.get('platform')
        if (errorPlatform) setPlatform(errorPlatform)

        const reason = searchParams.get('reason')
        if (reason) {
            // Decode the reason parameter and use it as a custom message
            const decodedReason = decodeURIComponent(reason)
            setMessage(decodedReason)
        }

        const accounts = searchParams.get('accounts')
        if (accounts) {
            const decodedAccounts = decodeURIComponent(accounts).split(',')
            setAccounts(decodedAccounts)
        }
        const errorCode = searchParams.get('code')

        // if (errorCode && platformErrorCodes.includes(errorCode as ErrorCode)) {
        //     setShowPlatformLimit(true)
        // }

        // Handle platform daily limit parameters
        const currentParam = searchParams.get('current')
        if (currentParam) setCurrent(parseInt(currentParam, 10))

        const limitParam = searchParams.get('limit')
        if (limitParam) setLimit(parseInt(limitParam, 10))

        const requestedParam = searchParams.get('requested')
        if (requestedParam) setRequested(parseInt(requestedParam, 10))
    }, [searchParams])

    const userFriendlyMessage = useMemo(() => {
        if (!error) return ''

        if (platform && current !== null && limit !== null && requested !== null) {
            const platformName = platform.charAt(0).toUpperCase() + platform.slice(1)
            return `${platformName} daily limit exceeded: ${current}/${limit} posts used. You tried to post ${requested} additional post${requested > 1 ? 's' : ''}.`
        }

        if (message === ERROR_MESSAGES.DUPLICATES && accounts.length > 0) {
            const readableList = accounts.join(', ')
            return platform
                ? `The following ${platform} pages are already connected: ${readableList}.`
                : `These pages are already connected: ${readableList}.`
        }

        if (message) return message

        return 'An unexpected error occurred while connecting your account.'
    }, [error, message, accounts, platform, current, limit, requested])

    return (
        <>
            <GenericDialog
                className="sm:max-w-[425px]"
                dialogContent={undefined}
                dialogHeaderDescription={userFriendlyMessage}
                dialogHeaderTitle={'Ooops something went wrong...'}
                dialogOpen={!!error}
                dialogFooter={
                    <Button className="w-full" size={'lg'} onClick={() => setError(false)}>
                        <ThumbsUp />I got it
                    </Button>
                }
            />
        </>
    )
}

export default ErrorDialog
