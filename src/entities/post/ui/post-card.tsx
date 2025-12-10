'use client'

import React, { useMemo, useState } from 'react'

import { Play } from 'lucide-react'
import Image from 'next/image'

import { Account, AccountAvatar } from '@/entities/account'
import { useSocialMediaAccounts } from '@/entities/account/model/use-social-media-accounts-service'
import { GenericCard } from '@/shared/components/generic-card'
import { cn } from '@/shared/lib/utils'
import { VideoPreviewDialog } from '@/shared/ui/video-preview-dialog'
import { formatCompactDate, formatDate } from '@/shared/utils/date-utils'

import { postStatusConfig } from '../const/post-status-config'
import { IPost, Media, PostStatus, PostType } from '../model/post.types'

interface PostCardProps {
    post: IPost
    isImage: boolean
    isVideo: boolean
    primaryMedia: Media
    editButton?: React.JSX.Element
    deleteButton?: React.JSX.Element
}

const PostCard: React.FC<PostCardProps> = ({ post, isImage, isVideo, primaryMedia, editButton, deleteButton }) => {
    const { accounts } = useSocialMediaAccounts()
    const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false)

    const accountsById = useMemo(() => {
        const m = new Map<string, Account>()
        for (const a of accounts) m.set(a.id, a)
        return m
    }, [accounts])

    const previewImage = isImage ? primaryMedia.url : undefined

    const statusInfo = postStatusConfig[post.status]

    const typeLabel = post.type === PostType.media ? 'Media post' : 'Text post'

    const stats = [
        {
            label: 'Targets',
            value: post.targets.length ? String(post.targets.length) : '0',
        },
        {
            label: 'Scheduled',
            value: formatCompactDate(post.scheduledTime),
            title: formatDate(post.scheduledTime),
        },
        {
            label: 'Status',
            value: statusInfo.label,
            icon: <statusInfo.Icon className={cn('size-3.5', statusInfo.toneClass)} />,
            toneClass: statusInfo.toneClass,
        },
    ]

    const handleVideoClick = () => {
        if (isVideo) setIsVideoDialogOpen(true)
    }

    const cardHeader = (
        <div className="flex items-center gap-4">
            <div
                className={cn(
                    'relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl ring-1 ring-black/5',
                    isVideo && 'cursor-pointer'
                )}
                onClick={handleVideoClick}
            >
                {previewImage ? (
                    <Image
                        alt={post.mainCaption || 'Post preview'}
                        className="size-full object-cover"
                        height={64}
                        src={previewImage}
                        width={64}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-xs font-medium text-slate-600">
                        {isVideo ? 'Video post' : typeLabel}
                    </div>
                )}
                {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Play className="size-5 text-white" />
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-1.5">
                <span className="truncate text-lg font-semibold">{'Scheduled post'}</span>
                {typeLabel && <span className="truncate text-sm">{typeLabel}</span>}
                <span className="text-xs text-slate-400">
                    {post.createdAt ? `Created ${formatCompactDate(post.createdAt)}` : ''}
                </span>
            </div>
        </div>
    )

    const cardContent = (
        <div className="flex flex-1 flex-col gap-6">
            <p className="truncate text-sm leading-relaxed ">{post.mainCaption || post.targets[0]?.text || ''}</p>

            <div className="rounded-2xl border px-5 py-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                    {stats.map((item) => (
                        <div key={item.label} className="flex flex-col items-center gap-1.5">
                            <span className="text-xs font-medium uppercase tracking-wide">{item.label}</span>
                            <span
                                className={cn('flex items-center gap-1 text-sm font-semibold', item.toneClass)}
                                title={item.title}
                            >
                                {item.icon}
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {!!post.targets.length && (
                <div className="flex flex-wrap gap-2.5">
                    {post.targets.map((target) => {
                        const account = accountsById.get(target.socialAccountId)

                        return (
                            <AccountAvatar
                                key={target.socialAccountId}
                                isSelected
                                className="shadow-[0_10px_25px_-15px_rgba(15,23,42,0.45)]"
                                isError={target.status === PostStatus.FAILED}
                                picture={account?.picture}
                                platform={target.platform}
                                username={account?.username || ''}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )

    const cardFooter = (editButton || deleteButton) && (
        <div className="flex gap-2 w-full">
            {editButton}
            {deleteButton}
        </div>
    )

    return (
        <>
            <GenericCard
                cardContainerClassName="flex size-full max-w-md flex-col gap-6 border "
                cardContent={cardContent}
                cardFooter={cardFooter}
                cardHeader={cardHeader}
            />

            {isVideo && primaryMedia?.url && (
                <VideoPreviewDialog
                    open={isVideoDialogOpen}
                    title="Post video"
                    videoSrc={primaryMedia.url}
                    videoType={primaryMedia.type}
                    onOpenChange={setIsVideoDialogOpen}
                />
            )}
        </>
    )
}

export default PostCard
