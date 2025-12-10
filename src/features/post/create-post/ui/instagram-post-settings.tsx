import React from 'react'

import { Account, AccountPlatform, accountsPlatformConfig } from '@/entities/account'
import { PostFormSchema } from '@/entities/post'
import { GenericSelect } from '@/shared/components/generic-select/ui/generic-select'
import { TagInput } from '@/shared/ui/tag-input'
import { Textarea } from '@/shared/ui/textarea'

import { useInstagramPostSettings } from '../model/use-instagram-post-settings'

interface InstagramPostSettingsProps {
    account: Account
    postText: string
    onPostTextChange: (
        text: string,
        accountId: string,
        platform?: AccountPlatform,
        title?: string,
        threadsReplies?: string[]
    ) => void
    scheduledPosts: PostFormSchema[]
    updateScheduledPost?: (accountId: string, updater: (post: PostFormSchema) => PostFormSchema) => void
    isDisabled?: boolean
    tags?: string[]
    currentTag?: string
    setCurrentTag?: (tag: string) => void
    addTag?: (tag: string) => void
    removeTag?: (index: number) => void
    clearTags?: () => void
}

export const InstagramPostSettings = ({
    account,
    postText,
    onPostTextChange,
    scheduledPosts,
    updateScheduledPost,
    isDisabled = false,
    tags = [],
    currentTag = '',
    setCurrentTag,
    addTag,
    removeTag,
    clearTags,
}: InstagramPostSettingsProps) => {
    const platform = AccountPlatform.instagram

    const { facebookPages, handleFacebookPageChange, instagramFacebookPageId, isFacebookPagesLoading } =
        useInstagramPostSettings({
            account,
            scheduledPosts,
            updateScheduledPost,
        })

    const selectValue = instagramFacebookPageId || 'none'

    return (
        <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{account.username}</p>

            <div className="flex flex-col gap-4">
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
                            maxTags={accountsPlatformConfig[platform].maxTags || 30}
                            placeholder={`Add hashtags for ${account.username}...`}
                            tags={tags}
                            onAddTag={addTag}
                            onClearTags={clearTags}
                            onRemoveTag={removeTag}
                            onTagChange={setCurrentTag}
                        />
                    </div>
                )}

                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-muted-foreground">Facebook Page for location</p>
                    {facebookPages.length > 0 ? (
                        <GenericSelect
                            disabled={isDisabled || isFacebookPagesLoading}
                            emptyOption={{ value: 'none', label: "Don't include Facebook Page" }}
                            getOptionLabel={(page) => page.username}
                            getOptionValue={(page) => page.id}
                            options={facebookPages}
                            placeholder="Choose Facebook Page (Optional)"
                            selectTriggerClass="w-full text-muted-foreground"
                            selectValue={selectValue}
                            handleSelect={(value) =>
                                handleFacebookPageChange(value === 'none' ? undefined : value)
                            }
                        />
                    ) : (
                        <p className="text-xs text-muted-foreground">
                            Connect a Facebook Page to enable bussines location for Instagram.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
