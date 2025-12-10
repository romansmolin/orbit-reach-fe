import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useRtkPostService } from '@/entities/post'

export const usePostTargetRetry = (postId: string, socialAccountId: string) => {
    const { retryPostTarget, retryPostTargetStatus } = useRtkPostService()
    const router = useRouter()

    const isRetryingPost = retryPostTargetStatus.isLoading
    const isRetryingPostError = retryPostTargetStatus.isError
    const isRetryingPostSuccess = retryPostTargetStatus.isSuccess

    useEffect(() => {
        if (isRetryingPostSuccess) {
            toast.success('Post republished!')
            router.refresh()
        }

        if (isRetryingPostError) toast.error('Post is not republished! Something went wrong!')
    }, [isRetryingPostError, isRetryingPostSuccess])

    const handleRetry = async () => {
        try {
            await retryPostTarget(postId, socialAccountId)
        } catch (error: unknown) {
            console.error('Failed to edit post:', error)
            throw error
        }
    }

    return { handleRetry, isRetryingPost }
}
