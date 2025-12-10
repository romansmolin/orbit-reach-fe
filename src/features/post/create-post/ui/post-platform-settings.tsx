'use client'

import React, { useMemo } from 'react'

import { ShieldAlertIcon } from 'lucide-react'

import { Account, AccountPlatform, accountsPlatformConfig } from '@/entities/account'
import { PostFormSchema } from '@/entities/post'
import { GenericCard } from '@/shared/components/generic-card'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { TagInput } from '@/shared/ui/tag-input'
import { Textarea } from '@/shared/ui/textarea'

import BlueskyPostSettings from './bluesky-post-settings'
import FacebookPostSettings from './facebook-post-settings'
import { InstagramPostSettings } from './instagram-post-settings'
import PinterestPostSettings from './pinterest-post-settings'
import ThreadsPostSettings from './threads-post.settings'
import TikTokPostSettings from './tiktok-post-settings'

interface PostPlatformSettingsProps {
    selectedAccounts: Account[]
    scheduledPosts: PostFormSchema[]
    mainText?: string
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
    onPinterestBoardSelect?: (accountId: string, boardId: string) => void
    isDisabled?: boolean
    currentTag?: string
    setCurrentTag?: (tag: string) => void
    addTagToAccount?: (accountId: string, tag: string) => void
    removeTagFromAccount?: (accountId: string, tagIndex: number) => void
    clearAccountTags?: (accountId: string) => void
    getAccountTags?: (accountId: string) => string[]
    getCurrentLink?: (accountId: string) => string
    setCurrentLink?: (accountId: string, link: string) => void
    addLinkToAccount?: (accountId: string, link: string) => void
    removeLinkFromAccount?: (accountId: string, linkIndex: number) => void
    clearAccountLinks?: (accountId: string) => void
    getAccountLinks?: (accountId: string) => string[]
    updateScheduledPost?: (accountId: string, updater: (post: PostFormSchema) => PostFormSchema) => void
}

const getMinCharacterLimit = (selectedPlatforms: AccountPlatform[]) => {
    return Math.min(...selectedPlatforms.map((platform) => accountsPlatformConfig[platform].maxCaption))
}

const getPostTextForAccount = (scheduledPosts: PostFormSchema[], accountId: string) => {
    return scheduledPosts.find((p) => p.account === accountId)?.text || ''
}

const getThreadsRepliesForAccount = (scheduledPosts: PostFormSchema[], accountId: string) => {
    return scheduledPosts.find((p) => p.account === accountId)?.threadsReplies || []
}

const getPostTitleForAccount = (scheduledPosts: PostFormSchema[], accountId: string) => {
    const post = scheduledPosts.find((p) => p.account === accountId)

    return post && 'title' in post ? post.title || '' : ''
}

const getTriggerTitle = (platform: AccountPlatform): string => {
    const triggerTitles = {
        [AccountPlatform.instagram]: 'Instagram',
        [AccountPlatform.bluesky]: 'Bluesky',
        [AccountPlatform.linkedin]: 'Linkedin',
        [AccountPlatform.facebook]: 'Facebook',
        [AccountPlatform.threads]: 'Threads',
        [AccountPlatform.youtube]: 'YouTube',
        [AccountPlatform.x]: 'X',
        [AccountPlatform.tiktok]: 'TikTok',
        [AccountPlatform.pinterest]: 'Pinterest',
    }

    return triggerTitles[platform]
}

const socialMediasWithNoTags = [AccountPlatform.linkedin, AccountPlatform.pinterest, AccountPlatform.youtube]

const PostPlatformSettings: React.FC<PostPlatformSettingsProps> = ({
    selectedAccounts,
    scheduledPosts,
    mainText,
    onPostTextChange,
    onPinterestBoardSelect,
    isDisabled = false,
    currentTag = '',
    setCurrentTag,
    addTagToAccount,
    removeTagFromAccount,
    clearAccountTags,
    getAccountTags,
    getCurrentLink,
    setCurrentLink,
    addLinkToAccount,
    removeLinkFromAccount,
    clearAccountLinks,
    getAccountLinks,
    isImagePost,
    tikTokAutoMusicEnabled,
    onEnableTikTokAutoMusic,
    updateScheduledPost,
}) => {
    const selectedPlatforms = useMemo(
        () => selectedAccounts.map((account) => account.platform as AccountPlatform),
        [selectedAccounts]
    )
    const uniqPlatforms = useMemo(() => [...new Set(selectedPlatforms)], [selectedPlatforms])

    const postPlatformSettingsContent = (
        <Tabs
            className="flex flex-col gap-5"
            defaultValue={typeof mainText !== 'undefined' ? 'main' : uniqPlatforms[0]}
        >
            <ScrollArea className="w-full whitespace-nowrap rounded-md border border-primary max-w-3xl mx-auto">
                <TabsList className="flex h-11 gap-2 border-0 w-full">
                    <TabsTrigger className="flex-1" value="main">
                        Main Caption
                    </TabsTrigger>

                    {uniqPlatforms.map((platform) => (
                        <TabsTrigger key={platform} className="flex-1" value={platform}>
                            {getTriggerTitle(platform)}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <ScrollBar className="hidden" orientation="horizontal" />
            </ScrollArea>

            <TabsContent value="main">
                <div className="flex flex-col gap-1">
                    <Textarea
                        className="min-h-54"
                        disabled={isDisabled}
                        maxLength={getMinCharacterLimit(selectedPlatforms)}
                        placeholder="Main caption for all accounts"
                        value={mainText}
                        onChange={(e) => onPostTextChange(e.target.value, '')}
                    />
                    <div className="text-xs text-muted-foreground text-right">
                        {mainText?.length} / {getMinCharacterLimit(selectedPlatforms)} characters
                    </div>
                </div>
            </TabsContent>

            {uniqPlatforms.map((platform) => (
                <TabsContent key={platform} value={platform}>
                    <div className="flex flex-col gap-3">
                        {selectedAccounts
                            .filter((acc) => acc.platform === platform)
                            .map((acc) => {
                                if (acc.platform === AccountPlatform.facebook) {
                                    return (
                                        <FacebookPostSettings
                                            key={acc.id}
                                            account={acc}
                                            currentTag={currentTag}
                                            isDisabled={isDisabled}
                                            postText={getPostTextForAccount(scheduledPosts, acc.id)}
                                            postTitle={getPostTitleForAccount(scheduledPosts, acc.id)}
                                            setCurrentTag={setCurrentTag}
                                            onPostTextChange={onPostTextChange}
                                        />
                                    )
                                }

                                if (acc.platform === AccountPlatform.instagram) {
                                    return (
                                        <InstagramPostSettings
                                            key={acc.id}
                                            account={acc}
                                            currentTag={currentTag}
                                            isDisabled={isDisabled}
                                            postText={getPostTextForAccount(scheduledPosts, acc.id)}
                                            scheduledPosts={scheduledPosts}
                                            setCurrentTag={setCurrentTag}
                                            tags={getAccountTags?.(acc.id) || []}
                                            updateScheduledPost={updateScheduledPost}
                                            addTag={
                                                addTagToAccount ? (tag) => addTagToAccount(acc.id, tag) : undefined
                                            }
                                            clearTags={
                                                clearAccountTags ? () => clearAccountTags(acc.id) : undefined
                                            }
                                            removeTag={
                                                removeTagFromAccount
                                                    ? (index) => removeTagFromAccount(acc.id, index)
                                                    : undefined
                                            }
                                            onPostTextChange={onPostTextChange}
                                        />
                                    )
                                }

                                if (acc.platform === AccountPlatform.pinterest && onPinterestBoardSelect) {
                                    const pinterestPost = scheduledPosts.find((p) => p.account === acc.id)
                                    const selectedBoardId = pinterestPost?.pinterestBoardId

                                    return (
                                        <PinterestPostSettings
                                            key={acc.id}
                                            account={acc}
                                            isDisabled={isDisabled}
                                            postText={getPostTextForAccount(scheduledPosts, acc.id)}
                                            postTitle={getPostTitleForAccount(scheduledPosts, acc.id)}
                                            selectedBoardId={selectedBoardId}
                                            onPostTextChange={onPostTextChange}
                                            onBoardSelect={(boardId) => {
                                                onPinterestBoardSelect(acc.id, boardId)
                                            }}
                                        />
                                    )
                                }

                                if (acc.platform === AccountPlatform.tiktok) {
                                    return (
                                        <TikTokPostSettings
                                            key={acc.id}
                                            account={acc}
                                            clearTags={() => clearAccountTags?.(acc.id)}
                                            currentTag={currentTag}
                                            isDisabled={isDisabled}
                                            isImagePost={isImagePost}
                                            postText={getPostTextForAccount(scheduledPosts, acc.id)}
                                            postTitle={getPostTitleForAccount(scheduledPosts, acc.id)}
                                            setCurrentTag={setCurrentTag}
                                            tags={getAccountTags?.(acc.id) || []}
                                            tikTokAutoMusicEnabled={tikTokAutoMusicEnabled}
                                            addTag={
                                                addTagToAccount ? (tag) => addTagToAccount(acc.id, tag) : () => {}
                                            }
                                            removeTag={(index) => removeTagFromAccount?.(acc.id, index)}
                                            onEnableTikTokAutoMusic={onEnableTikTokAutoMusic}
                                            onPostTextChange={onPostTextChange}
                                        />
                                    )
                                }

                                if (acc.platform === AccountPlatform.threads) {
                                    return (
                                        <ThreadsPostSettings
                                            key={acc.id}
                                            account={acc}
                                            clearLinks={() => clearAccountLinks?.(acc.id)}
                                            clearTags={() => clearAccountTags?.(acc.id)}
                                            currentLink={getCurrentLink?.(acc.id) || ''}
                                            currentTag={currentTag}
                                            isDisabled={isDisabled}
                                            links={getAccountLinks?.(acc.id) || []}
                                            postText={getPostTextForAccount(scheduledPosts, acc.id)}
                                            setCurrentTag={setCurrentTag}
                                            tags={getAccountTags?.(acc.id) || []}
                                            addLink={
                                                addLinkToAccount
                                                    ? (link) => addLinkToAccount(acc.id, link)
                                                    : () => {}
                                            }
                                            addTag={
                                                addTagToAccount ? (tag) => addTagToAccount(acc.id, tag) : () => {}
                                            }
                                            removeLink={(index) => removeLinkFromAccount?.(acc.id, index)}
                                            removeTag={(index) => removeTagFromAccount?.(acc.id, index)}
                                            setCurrentLink={
                                                setCurrentLink ? (link) => setCurrentLink(acc.id, link) : undefined
                                            }
                                            threadsReplies={getThreadsRepliesForAccount(scheduledPosts, acc.id)}
                                            onPostTextChange={onPostTextChange}
                                        />
                                    )
                                }

                                if (acc.platform === AccountPlatform.bluesky) {
                                    return (
                                        <BlueskyPostSettings
                                            key={acc.id}
                                            account={acc}
                                            clearLinks={() => clearAccountLinks?.(acc.id)}
                                            clearTags={() => clearAccountTags?.(acc.id)}
                                            currentLink={getCurrentLink?.(acc.id) || ''}
                                            currentTag={currentTag}
                                            isDisabled={isDisabled}
                                            links={getAccountLinks?.(acc.id) || []}
                                            postText={getPostTextForAccount(scheduledPosts, acc.id)}
                                            setCurrentTag={setCurrentTag}
                                            tags={getAccountTags?.(acc.id) || []}
                                            addLink={
                                                addLinkToAccount
                                                    ? (link) => addLinkToAccount(acc.id, link)
                                                    : () => {}
                                            }
                                            addTag={
                                                addTagToAccount ? (tag) => addTagToAccount(acc.id, tag) : () => {}
                                            }
                                            removeLink={(index) => removeLinkFromAccount?.(acc.id, index)}
                                            removeTag={(index) => removeTagFromAccount?.(acc.id, index)}
                                            setCurrentLink={
                                                setCurrentLink ? (link) => setCurrentLink(acc.id, link) : undefined
                                            }
                                            onPostTextChange={onPostTextChange}
                                        />
                                    )
                                }

                                return (
                                    <div key={acc.id}>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">
                                            {acc.username}
                                        </p>
                                        {(() => {
                                            const postText = getPostTextForAccount(scheduledPosts, acc.id)
                                            const maxCaption = accountsPlatformConfig[platform].maxCaption
                                            const characterCount = postText.length
                                            const counterClassName = `text-xs text-right ${
                                                characterCount > maxCaption
                                                    ? 'text-destructive'
                                                    : 'text-muted-foreground'
                                            }`

                                            return (
                                                <div className="flex flex-col gap-1">
                                                    <Textarea
                                                        className="min-h-54"
                                                        disabled={isDisabled}
                                                        maxLength={maxCaption}
                                                        placeholder={`Caption for ${acc.username}`}
                                                        value={postText}
                                                        onChange={(e) =>
                                                            onPostTextChange(
                                                                e.target.value,
                                                                acc.id,
                                                                acc.platform as AccountPlatform
                                                            )
                                                        }
                                                    />
                                                    <div className={counterClassName}>
                                                        {characterCount} / {maxCaption} characters
                                                    </div>
                                                </div>
                                            )
                                        })()}

                                        {/* Tags for this specific platform */}
                                        {setCurrentTag &&
                                            addTagToAccount &&
                                            removeTagFromAccount &&
                                            clearAccountTags &&
                                            getAccountTags &&
                                            !socialMediasWithNoTags.includes(platform) && (
                                                <div className="mt-3">
                                                    <TagInput
                                                        currentTag={currentTag}
                                                        placeholder={`Add hashtags for ${acc.username}...`}
                                                        tags={getAccountTags?.(acc.id) || []}
                                                        maxTags={accountsPlatformConfig[platform].maxTags || 15}
                                                        onClearTags={() => clearAccountTags?.(acc.id)}
                                                        onTagChange={setCurrentTag}
                                                        onAddTag={
                                                            addTagToAccount
                                                                ? (tag) => addTagToAccount(acc.id, tag)
                                                                : () => {}
                                                        }
                                                        onRemoveTag={(index) =>
                                                            removeTagFromAccount?.(acc.id, index)
                                                        }
                                                    />
                                                </div>
                                            )}
                                    </div>
                                )
                            })}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    )
    return (
        <>
            <Alert variant="warning">
                <ShieldAlertIcon className="!size-5" />
                <AlertTitle>Platform Restrictions</AlertTitle>
                <AlertDescription>
                    Each platform has different character limits and requirements. Customize your content for each
                    platform using the tabs below.
                </AlertDescription>
            </Alert>
            <GenericCard
                cardContainerClassName="rounded-md border border-primary px-5 pb-5 flex flex-col gap-5 max-w-[96vw]"
                cardContent={postPlatformSettingsContent}
                cardContentClassName="flex flex-col gap-2"
                cardTitle={<span className="font-bold text-primary dark:text-white">Platform Settings</span>}
            />
        </>
    )
}

export default PostPlatformSettings
