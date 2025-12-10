'use client'

import React from 'react'
import { RefreshCcw } from 'lucide-react'

import { PostTarget } from '@/entities/post'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import { usePostTargetRetry } from '../model/use-post-target-retry'

const PostTargetRetryButton = ({
    postTarget,
    postId,
    text,
}: {
    postTarget: PostTarget
    postId: string
    text?: string
}) => {
    const { handleRetry, isRetryingPost } = usePostTargetRetry(postId, postTarget.socialAccountId)
    return (
        <Button
            className="text-white border-white"
            disabled={isRetryingPost}
            variant={'outline'}
            onClick={() => handleRetry()}
        >
            <RefreshCcw className={cn(isRetryingPost && 'animate-spin')} />
            {text}
        </Button>
    )
}

export default PostTargetRetryButton
