'use client'

import { useEffect } from 'react'

import { Type } from 'lucide-react'

import { useSocialMediaAccounts } from '@/entities/account'
import { PostType } from '@/entities/post'
import { SelectAccounts } from '@/features/account/select-accounts'
import { usePostContext } from '@/features/post/create-post/context/use-post-context'
import PostPlatformSettings from '@/features/post/create-post/ui/post-platform-settings'
import { Alert, AlertDescription } from '@/shared/ui/alert'

import { PostScheduler } from './post-scheduler'

export const TextPostForm = ({ copyData }: { copyData?: string }) => {
    const { accounts, isLoading: isLoadingAccounts } = useSocialMediaAccounts()
    const {
        mainCaption,
        onAccountSelect,
        onPostTextChange,
        onPinterestBoardSelect,
        postType,
        scheduledPosts,
        selectedAccounts,
        setPostType,
        onPostDateTimeChange,
        scheduledTime,
        setShouldSchedule,
        shouldSchedule,
        currentTag,
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
        tikTokAutoMusicEnabled,
        onEnableTikTokAutoMusic,
        updateScheduledPost,
    } = usePostContext(copyData)

    useEffect(() => setPostType(PostType.text), [setPostType])

    return (
        <div className="flex flex-col gap-4 h-full">
            <Alert className="" variant="tip">
                <Type className="h-4 w-4" />
                <AlertDescription>
                    Create engaging text posts for your social media accounts. Use hashtags and tags to increase
                    reach.
                </AlertDescription>
            </Alert>

            <SelectAccounts
                hasMedia={false}
                isLoading={isLoadingAccounts}
                postType={postType}
                selectedAccounts={selectedAccounts}
                socialMediaAccounts={accounts || []}
                onAccountSelect={onAccountSelect}
            />

            <PostPlatformSettings
                addLinkToAccount={addLinkToAccount}
                addTagToAccount={addTagToAccount}
                clearAccountLinks={clearAccountLinks}
                clearAccountTags={clearAccountTags}
                currentTag={currentTag}
                getAccountLinks={getAccountLinks}
                getAccountTags={getAccountTags}
                getCurrentLink={getCurrentLink}
                isImagePost={false}
                mainText={mainCaption}
                removeLinkFromAccount={removeLinkFromAccount}
                removeTagFromAccount={removeTagFromAccount}
                scheduledPosts={scheduledPosts}
                selectedAccounts={selectedAccounts}
                setCurrentLink={setCurrentLink}
                setCurrentTag={setCurrentTag}
                tikTokAutoMusicEnabled={tikTokAutoMusicEnabled}
                updateScheduledPost={updateScheduledPost}
                onEnableTikTokAutoMusic={onEnableTikTokAutoMusic}
                onPinterestBoardSelect={onPinterestBoardSelect}
                onPostTextChange={onPostTextChange}
            />

            <PostScheduler
                scheduledTime={scheduledTime}
                selectedAccounts={selectedAccounts}
                setShouldSchedule={setShouldSchedule}
                shouldSchedule={shouldSchedule}
                onPostDateTimeChange={onPostDateTimeChange}
            />
        </div>
    )
}
