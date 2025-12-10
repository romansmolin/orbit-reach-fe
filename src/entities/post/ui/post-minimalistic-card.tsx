import React from 'react'

import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { format } from 'date-fns/format'
import Image from 'next/image'

import { accountsPlatformConfig } from '@/entities/account'
import { cn } from '@/shared/lib/utils'
import { Tooltip, TooltipContent } from '@/shared/ui/tooltip'

import { IPost, PostType } from '../model/post.types'

const PostMinimalisticCards = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { post: IPost }>(
    ({ post, ...props }, ref) => (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    ref={ref}
                    role="button"
                    tabIndex={0}
                    {...props}
                    className={cn(
                        'rounded-sm p-2 text-xs text-left w-full cursor-pointer',
                        post.type === PostType.media ? 'bg-primary/80' : 'bg-emerald-500/70'
                    )}
                >
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-gray-200">
                            {format(new Date(post.scheduledTime), 'HH:mm')}
                        </span>

                        <div className="flex flex-wrap gap-1">
                            {[...new Set(post.targets.map((t) => t.platform))].map((platform) => (
                                <div key={platform}>
                                    {React.isValidElement(accountsPlatformConfig[platform].icon) ? (
                                        <span className="h-3.5 w-3.5 text-white flex items-center justify-center">
                                            {accountsPlatformConfig[platform].icon}
                                        </span>
                                    ) : (
                                        React.createElement(
                                            accountsPlatformConfig[platform].icon as React.ComponentType<{
                                                className?: string
                                            }>,
                                            {
                                                className: 'h-3.5 w-3.5 text-white',
                                            }
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="truncate mb-1 text-white">
                        {post.mainCaption
                            ? post.mainCaption.length > 40
                                ? post.mainCaption.slice(0, 40) + '...'
                                : post.mainCaption
                            : post.targets[0].text.length > 40
                              ? post.targets[0].text.slice(0, 40)
                              : ''}
                    </div>
                </div>
            </TooltipTrigger>
            <TooltipContent className="!p-1">
                {post.media && post.media[0]?.url && post.media[0].type.startsWith('image') && (
                    <Image
                        alt={post.mainCaption || post.status}
                        className="rounded"
                        height={400}
                        src={post.media[0]?.url}
                        width={300}
                    />
                )}
                {post.media && post.media[0]?.url && post.media[0].type.startsWith('video') && (
                    <video
                        autoPlay
                        controls
                        playsInline
                        className="w-full h-auto max-h-[30vh] object-contain rounded"
                    >
                        <source src={post.media[0]?.url} type={post.media[0].type} />
                        <source src={post.media[0].type} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
                {post.type === PostType.text && (
                    <div className="p-2 max-w-2xs">
                        <h2>{post.mainCaption || post.targets[0]?.text || ''}</h2>
                    </div>
                )}
            </TooltipContent>
        </Tooltip>
    )
)

PostMinimalisticCards.displayName = 'PostMinimalisticCards'

export default PostMinimalisticCards
