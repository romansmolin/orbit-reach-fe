'use client'

import React, { ReactNode, useMemo, useState } from 'react'

import { Loader2, ShieldAlertIcon } from 'lucide-react'

import { IPost, MediaType, PostStatus, PostTargetAlert, PostType } from '@/entities/post'
import { SelectAccounts } from '@/features/account/select-accounts'
import { CopyPostButton } from '@/features/post/copy-post'
import { GenericDialog } from '@/shared/components'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { CustomMediaUploader } from '@/shared/ui/custom-media-uploader'

import { PostScheduler } from '../../create-post'
import PostPlatformSettings from '../../create-post/ui/post-platform-settings'
import PostTargetRetryButton from '../../retry-post/ui/post-target-retry-button'
import { buttonConfigBasedOnStatus } from '../model/edit-post-button-config'
import { usePostEdit } from '../model/use-post-edit'

interface EditPostCardProps {
    children: ReactNode
    post: IPost
}

const EditPostWrapper: React.FC<EditPostCardProps> = ({ children, post }) => {
    const [isOpen, setIsOpen] = useState(false)

    const onSave = async () => {
        await handleSave()
        setIsOpen(false)
    }

    const {
        selectedAccounts,
        scheduledPosts,
        shouldSchedule,
        scheduledTime,
        accounts,
        isLoadingAccounts,
        isLoading,
        previewUrls,
        onAccountSelect,
        onPostTextChange,
        onPostDateTimeChange,
        setShouldSchedule,
        handleSave,
        setPreviewUrls,
        onFileSelect,
        mainCaption,
        currentTag,
        getCurrentLink,
        setCurrentTag,
        addTagToAccount,
        removeTagFromAccount,
        clearAccountTags,
        getAccountTags,
        setCurrentLink,
        addLinkToAccount,
        removeLinkFromAccount,
        clearAccountLinks,
        getAccountLinks,
        updateScheduledPost,
        tikTokAutoMusicEnabled,
        onEnableTikTokAutoMusic,
        mediaType,
    } = usePostEdit(post)

    const failedPosts = useMemo(() => post.targets.filter((target) => target.status === PostStatus.FAILED), [post])

    const isPostEditingDisabled =
        post.status === PostStatus.DONE ||
        post.status === PostStatus.PARTIALLY_DONE ||
        post.status === PostStatus.POSTING ||
        post.status === PostStatus.FAILED

    const dialogContent = (
        <div className="flex flex-col gap-3 w-full">
            {post.status === PostStatus.FAILED && (
                <Alert variant={'destructive'}>
                    <ShieldAlertIcon className="!size-5" />
                    <AlertTitle>Failed to publish!</AlertTitle>
                    <AlertDescription>
                        Your scheduled post failed to publish to all selected platforms. Please reschedule or
                        contact support if the issue continues.
                    </AlertDescription>
                </Alert>
            )}

            {failedPosts.length > 0 && post.status === PostStatus.PARTIALLY_DONE && (
                <div className="flex flex-col gap-2">
                    {failedPosts.map((failedPost) => {
                        return (
                            <PostTargetAlert
                                key={failedPost.socialAccountId}
                                failedPost={failedPost}
                                alertButton={
                                    <PostTargetRetryButton postId={post.postId} postTarget={failedPost} />
                                }
                            />
                        )
                    })}
                </div>
            )}

            <div className="space-y-6">
                {post.type === PostType.media && (
                    <CustomMediaUploader
                        showPreview
                        description={''}
                        dropzoneClassName="h-[420px]"
                        previewUrls={previewUrls}
                        setPreviewUrls={setPreviewUrls}
                        onFileSelect={onFileSelect}
                    />
                )}
                <SelectAccounts
                    isDisabled={isPostEditingDisabled}
                    isLoading={isLoadingAccounts}
                    selectedAccounts={selectedAccounts}
                    socialMediaAccounts={accounts || []}
                    disabledMessage={
                        isPostEditingDisabled
                            ? 'This post is already published. To try the same content, please copy it and create a new post.'
                            : undefined
                    }
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
                    isDisabled={isPostEditingDisabled}
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
        </div>
    )

    const dialogFooter = (
        <div className="flex flex-col sm:flex-row justify-between gap-2 w-full">
            <CopyPostButton className="sm:flex-1" post={post} />

            <Button
                className="gap-2 sm:flex-1"
                disabled={isLoading || buttonConfigBasedOnStatus[post.status]?.disable}
                size={'lg'}
                onClick={onSave}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                    </>
                ) : (
                    <>
                        {buttonConfigBasedOnStatus[post.status]?.icon}
                        {buttonConfigBasedOnStatus[post.status]?.title}
                    </>
                )}
            </Button>
        </div>
    )

    return (
        <GenericDialog
            className="!max-w-3xl max-h-[90vh] overflow-y-auto"
            dialogContent={dialogContent}
            dialogFooter={dialogFooter}
            dialogHeaderDescription="Modify your post content, platforms, and scheduling settings. Changes will be saved when you click Save."
            dialogHeaderTitle={`Edit ${post.type === PostType.media ? 'Media' : 'Text'} Post`}
            dialogOpen={isOpen}
            dialogTriggerComp={children}
            onDialogOpenChange={setIsOpen}
        />
    )
}

export default EditPostWrapper
