import { useCallback } from 'react'

import { platformErrorCodes } from '@/entities/post/const/post-platform-error-codes'
import { ErrorCode } from '@/shared/api/error-codes'
import { notifyError } from '@/shared/lib/notifications'

interface PostErrorHandlerParams {
    pathname: string
    push: (url: string) => void
}

export type PostErrorHandler = (error: unknown) => void

export const usePostErrorHandler = ({ pathname, push }: PostErrorHandlerParams): PostErrorHandler => {
    return useCallback(
        (error: unknown) => {
            if (typeof error !== 'object' || error === null) {
                return
            }

            const postError = error as {
                data?: {
                    code?: string
                    message?: string
                    platform?: string
                    current?: number
                    limit?: number
                    requested?: number
                }
            }

            if (postError.data?.code && postError.data.message) {
                const { code, message } = postError.data

                if (platformErrorCodes.includes(code as ErrorCode)) {
                    const urlParams = new URLSearchParams({
                        error: code,
                        message,
                    })

                    if (postError.data.platform) {
                        urlParams.set('platform', postError.data.platform)
                    }
                    if (postError.data.current !== undefined) {
                        urlParams.set('current', postError.data.current.toString())
                    }
                    if (postError.data.limit !== undefined) {
                        urlParams.set('limit', postError.data.limit.toString())
                    }
                    if (postError.data.requested !== undefined) {
                        urlParams.set('requested', postError.data.requested.toString())
                    }

                    const url = `${pathname}${urlParams.toString() ? `?${urlParams}` : ''}`
                    push(url)
                    return
                }

                notifyError(message)
            }
        },
        [pathname, push]
    )
}
