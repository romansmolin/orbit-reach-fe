import React from 'react'

import { Account, AccountPlatform, accountsPlatformConfig } from '@/entities/account'
import { LinkInput } from '@/shared/ui/link-input'
import { TagInput } from '@/shared/ui/tag-input'
import { Textarea } from '@/shared/ui/textarea'

interface BlueskyPostSettingsProps {
    account: Account
    postText: string
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

const formatHashtag = (tag: string) => (tag.startsWith('#') ? tag : `#${tag}`)

const getHashtagContributionLength = (tags: string[]) => {
    if (!tags.length) return 0
    const formattedTags = tags.map(formatHashtag)
    const tagsLength = formattedTags.reduce((length, tag) => length + tag.length, 0)
    const spacesBetweenTags = formattedTags.length - 1
    return tagsLength + spacesBetweenTags
}

const getBlueskyCharacterCount = (text: string, tags: string[], links: string[]) => {
    const tagContribution = getHashtagContributionLength(tags)

    const nonEmptyItems = (text.trim().length > 0 ? 1 : 0) + tags.filter((tag) => tag.trim().length > 0).length

    const spacesBetweenItems = nonEmptyItems > 0 ? nonEmptyItems - 1 : 0

    return text.length + tagContribution + spacesBetweenItems
}

const BlueskyPostSettings = ({
    account,
    postText,
    onPostTextChange,
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
}: BlueskyPostSettingsProps) => {
    const platform = AccountPlatform.bluesky
    const maxCaption = accountsPlatformConfig[platform].maxCaption
    const characterCount = getBlueskyCharacterCount(postText, tags, links)
    const counterClassName = `text-xs text-right ${
        characterCount > maxCaption ? 'text-destructive' : 'text-muted-foreground'
    }`

    return (
        <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{account.username}</p>
            <div className="flex flex-col gap-1">
                <Textarea
                    className="min-h-54"
                    disabled={isDisabled}
                    maxLength={maxCaption}
                    placeholder={`Caption for ${account.username}`}
                    value={postText}
                    onChange={(e) => onPostTextChange(e.target.value, account.id, platform)}
                />
                <div className={counterClassName}>
                    {characterCount} / {maxCaption} characters
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

export default BlueskyPostSettings
