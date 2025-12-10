import React, { useMemo } from 'react'

import { X } from 'lucide-react'

import { Account, AccountPlatform, accountsPlatformConfig } from '@/entities/account'
import { Button } from '@/shared/ui/button'
import { LinkInput } from '@/shared/ui/link-input'
import { TagInput } from '@/shared/ui/tag-input'
import { Textarea } from '@/shared/ui/textarea'

interface ThreadsPostSettingsProps {
    account: Account
    postText: string
    threadsReplies?: string[]
    onPostTextChange: (
        text: string,
        accountId: string,
        platform?: AccountPlatform,
        title?: string,
        threadsReplies?: string[]
    ) => void
    isDisabled?: boolean

    tags?: string[]
    currentTag?: string
    setCurrentTag?: (tag: string) => void
    addTag?: (tag: string) => void
    removeTag?: (index: number) => void
    clearTags?: () => void

    links?: string[]
    currentLink?: string
    setCurrentLink?: (tag: string) => void
    addLink?: (tag: string) => void
    removeLink?: (index: number) => void
    clearLinks?: () => void
}

const ThreadsPostSettings: React.FC<ThreadsPostSettingsProps> = ({
    account,
    postText,
    onPostTextChange,
    threadsReplies,
    isDisabled,
    tags = [],
    currentTag = '',
    setCurrentTag,
    addTag,
    removeTag,
    clearTags,
    links = [],
    currentLink = '',
    setCurrentLink,
    addLink,
    removeLink,
    clearLinks,
}) => {
    const platform = AccountPlatform.threads

    const segments = useMemo(() => {
        const replySegments = threadsReplies ?? []
        const initial = postText || ''
        const combined = [initial, ...replySegments].filter((seg, idx) => seg !== undefined || idx === 0)

        if (!combined.length) return ['']
        return combined.map((seg) => seg ?? '')
    }, [postText, threadsReplies])

    const updateSegments = (nextSegments: string[]) => {
        const normalized = nextSegments.map((seg) => seg ?? '')
        const [first, ...replies] = normalized
        onPostTextChange(first || '', account.id, platform, undefined, replies)
    }

    const handleSegmentChange = (value: string, index: number) => {
        const next = [...segments]
        next[index] = value
        updateSegments(next)
    }

    const handleAddSegment = () => {
        updateSegments([...segments, ''])
    }

    const handleRemoveSegment = (index: number) => {
        if (segments.length <= 1) return
        updateSegments(segments.filter((_, i) => i !== index))
    }

    return (
        <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{account.username}</p>
            <div className="flex flex-col gap-3">
                {segments.map((segment, index) => (
                    <div key={`thread-segment-${index}`} className="flex gap-3">
                        <div className="flex flex-col items-center gap-2 pt-1">
                            <img
                                alt={account.username}
                                className="size-9 rounded-full object-cover border border-border"
                                src={account.picture}
                            />
                            {index < segments.length - 1 && <div className="w-px flex-1 bg-border" />}
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold text-foreground">{account.username}</div>
                                <div className="text-xs text-muted-foreground">
                                    {index + 1}/{segments.length}
                                </div>
                            </div>
                            <Textarea
                                className="min-h-40"
                                disabled={isDisabled}
                                maxLength={accountsPlatformConfig[platform].maxCaption}
                                placeholder={`Thread ${index + 1} for ${account.username}`}
                                value={segment}
                                onChange={(e) => handleSegmentChange(e.target.value, index)}
                            />
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Thread {index + 1}</span>
                                <span>
                                    {segment.length} / {accountsPlatformConfig[platform].maxCaption}
                                </span>
                            </div>
                            {segments.length > 1 && (
                                <div className="flex justify-end">
                                    <Button
                                        aria-label="Remove thread reply"
                                        className="text-muted-foreground hover:text-foreground"
                                        disabled={isDisabled}
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => handleRemoveSegment(index)}
                                    >
                                        <X className="size-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <div className="flex items-center gap-3 pl-12">
                    <img
                        alt={`${account.username} add to thread`}
                        className="size-8 rounded-full object-cover border border-border opacity-70"
                        src={account.picture}
                    />
                    <Button
                        className="font-medium"
                        disabled={isDisabled}
                        size="sm"
                        variant="outline"
                        onClick={handleAddSegment}
                    >
                        Add to thread
                    </Button>
                </div>
            </div>

            {setCurrentTag && addTag && removeTag && clearTags && (
                <div className="mt-3">
                    <TagInput
                        currentTag={currentTag}
                        maxTags={accountsPlatformConfig[platform].maxTags}
                        placeholder={`Add hashtags for ${account.username}...`}
                        tags={tags}
                        onAddTag={addTag}
                        onClearTags={clearTags}
                        onRemoveTag={removeTag}
                        onTagChange={setCurrentTag}
                    />
                </div>
            )}

            {setCurrentLink && addLink && removeLink && clearLinks && (
                <div className="mt-3">
                    <LinkInput
                        currentLink={currentLink}
                        links={links}
                        maxLinks={accountsPlatformConfig[platform].maxLinks}
                        placeholder={`Add links for ${account.username}...`}
                        onAddLink={addLink}
                        onClearLinks={clearLinks}
                        onLinkChange={setCurrentLink}
                        onRemoveLink={removeLink}
                    />
                </div>
            )}
        </div>
    )
}

export default ThreadsPostSettings
