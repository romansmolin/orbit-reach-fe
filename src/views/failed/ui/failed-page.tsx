import React from 'react'

import { PlusCircleIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PostTargetAlert } from '@/entities/post'
import { getFailedPostTargets } from '@/entities/post/server'
import PostTargetRetryButton from '@/features/post/retry-post/ui/post-target-retry-button'
import { Illustration2 } from '@/shared/assets/illustration-2'
import { Button } from '@/shared/ui/button'

const FailedPage = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) notFound()

    const failedPosts = await getFailedPostTargets(token)

    if (failedPosts.failedPostTargets.length === 0) {
        return (
            <div className="flex flex-col gap-4 w-full justify-center items-center flex-1">
                <Illustration2 className="fill-primary size-60" />
                <span className="text-lg italic w-64 text-center text-primary">
                    No failed posts found! You are doing great job, keep going!
                </span>
                <Button asChild size="lg">
                    <Link href={'/new-post'}>
                        <PlusCircleIcon />
                        Create Post
                    </Link>
                </Button>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-3">
            {failedPosts.failedPostTargets.map((failedPost) => (
                <PostTargetAlert
                    key={failedPost.socialAccountId}
                    alertButton={<PostTargetRetryButton postId={failedPost.postId} postTarget={failedPost} />}
                    failedPost={failedPost}
                />
            ))}
        </div>
    )
}

export default FailedPage
