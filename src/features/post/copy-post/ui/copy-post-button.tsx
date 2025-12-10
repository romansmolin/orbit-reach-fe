'use client'

import React, { ReactNode } from 'react'

import { Copy } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { IPost } from '@/entities/post'
import { Button } from '@/shared/ui/button'

interface CopyPostButtonProps {
    post: IPost
    className?: string
    buttonText?: string
    icon?: ReactNode
}

const CopyPostButton: React.FC<CopyPostButtonProps> = ({ post, className, buttonText, icon }) => {
    const router = useRouter()

    const handleCopyPost = () => {
        const copiedPostData = {
            postId: post.postId,
            type: post.type,
            mainCaption: post.mainCaption,
            targets: post.targets,
            media: post.media,
            scheduledTime: post.scheduledTime,
        }

        const encodedData = encodeURIComponent(JSON.stringify(copiedPostData))

        router.push(`/new-post?copy=${encodedData}`)
    }

    return (
        <Button className={className} size="lg" variant="outline" onClick={handleCopyPost}>
            {icon ? icon : <Copy className="w-4 h-4 " />}
            {buttonText ? buttonText : 'Copy'}
        </Button>
    )
}

export default CopyPostButton
