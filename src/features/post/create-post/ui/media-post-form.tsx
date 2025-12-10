'use client'

import { useEffect } from 'react'

import { HeartHandshake } from 'lucide-react'

import { useSocialMediaAccounts } from '@/entities/account'
import { MediaType, PostType } from '@/entities/post'
import { SelectAccounts } from '@/features/account/select-accounts'
import { usePostContext } from '@/features/post/create-post/context/use-post-context'
import PostPlatformSettings from '@/features/post/create-post/ui/post-platform-settings'
import { Alert, AlertDescription } from '@/shared/ui/alert'
import { CustomMediaUploader } from '@/shared/ui/custom-media-uploader'

import { PostScheduler } from './post-scheduler'

export const MediaPostForm = ({ copyData }: { copyData?: string }) => {
    const { accounts, isLoading: isLoadingAccounts } = useSocialMediaAccounts()
    const {
        mainCaption,
        mediaType,
        onAccountSelect,
        onPostTextChange,
        onPinterestBoardSelect,
        previewUrls,
        postType,
        scheduledPosts,
        selectedAccounts,
        onFileSelect,
        setPreviewUrls,
        setPostType,
        onPostDateTimeChange,
        scheduledTime,
        setShouldSchedule,
        shouldSchedule,
        media,
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

    useEffect(() => setPostType(PostType.media), [setPostType])

    return (
        <div className="flex flex-col gap-4 h-full">
            <Alert className="" variant="tip">
                <HeartHandshake className="h-4 w-4" />
                <AlertDescription>
                    If you want to see image as you expect, the most appropriate aspect ration is from 1.91 to 4/5
                </AlertDescription>
            </Alert>

            <CustomMediaUploader
                description="Upload files (max 10 images or 1 video) and max of 50MB per each file"
                dropzoneClassName="h-[420px]"
                maxFiles={10}
                previewUrls={previewUrls}
                setPreviewUrls={setPreviewUrls}
                onFileSelect={onFileSelect}
            />
            <SelectAccounts
                hasMedia={!!(media && media.length > 0)}
                isLoading={isLoadingAccounts}
                mediaType={mediaType}
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
                isImagePost={mediaType === MediaType.IMAGE}
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
