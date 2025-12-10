import React from 'react'

import { Account, AccountPlatform, accountsPlatformConfig } from '@/entities/account'
import { Input } from '@/shared/ui/input'
import { Switch } from '@/shared/ui/switch'
import { TagInput } from '@/shared/ui/tag-input'
import { Textarea } from '@/shared/ui/textarea'

interface TikTokPostSettingsProps {
    account: Account
    postText: string
    postTitle: string
    onPostTextChange: (
        text: string,
        accountId: string,
        platform?: AccountPlatform,
        title?: string,
        threadsReplies?: string[]
    ) => void
    isImagePost: boolean
    tikTokAutoMusicEnabled: Record<string, boolean>
    onEnableTikTokAutoMusic: (accountId: string, enable: boolean) => void
    isDisabled?: boolean
    tags?: string[]
    currentTag?: string
    setCurrentTag?: (tag: string) => void
    addTag?: (tag: string) => void
    removeTag?: (index: number) => void
    clearTags?: () => void
}

const TikTokPostSettings: React.FC<TikTokPostSettingsProps> = ({
    account,
    postText,
    postTitle,
    onPostTextChange,
    isDisabled = false,
    tags = [],
    currentTag = '',
    setCurrentTag,
    addTag,
    removeTag,
    clearTags,
    isImagePost,
    tikTokAutoMusicEnabled,
    onEnableTikTokAutoMusic,
}) => {
    const platform = AccountPlatform.tiktok

    return (
        <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{account.username}</p>

            <div className="flex flex-col gap-5">
                {/* TITLE */}
                <div className="flex flex-col gap-1">
                    <Input
                        disabled={isDisabled}
                        maxLength={accountsPlatformConfig[platform].maxTitle}
                        placeholder="Title (Optional)"
                        value={postTitle}
                        onChange={(e) => onPostTextChange(postText, account.id, platform, e.target.value)}
                    />
                    <div className="text-xs text-muted-foreground text-right">
                        {postTitle.length} / {accountsPlatformConfig[platform].maxTitle} characters
                    </div>
                </div>
                {/* CAPTION */}
                <div className="flex flex-col gap-1">
                    <Textarea
                        className="min-h-54"
                        disabled={isDisabled}
                        maxLength={accountsPlatformConfig[platform].maxCaption}
                        placeholder={`Caption for ${account.username}`}
                        value={postText}
                        onChange={(e) => onPostTextChange(e.target.value, account.id, platform)}
                    />
                    <div className="text-xs text-muted-foreground text-right">
                        {postText.length} / {accountsPlatformConfig[platform].maxCaption} characters
                    </div>
                </div>

                {setCurrentTag && addTag && removeTag && clearTags && (
                    <div>
                        <TagInput
                            currentTag={currentTag}
                            isDisabled={isDisabled}
                            maxTags={15}
                            placeholder={`Add hashtags for ${account.username}...`}
                            tags={tags}
                            onAddTag={addTag}
                            onClearTags={clearTags}
                            onRemoveTag={removeTag}
                            onTagChange={setCurrentTag}
                        />
                    </div>
                )}

                {isImagePost && (
                    <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                            Would you rather TikTok to add music to post?
                        </h3>

                        <Switch
                            checked={tikTokAutoMusicEnabled[account.id] || false}
                            disabled={isDisabled}
                            onCheckedChange={
                                isImagePost
                                    ? () =>
                                          onEnableTikTokAutoMusic(
                                              account.id,
                                              !(tikTokAutoMusicEnabled[account.id] || false)
                                          )
                                    : () => undefined
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default TikTokPostSettings
