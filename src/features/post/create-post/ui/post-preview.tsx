'use client'

import { useMemo, useState } from 'react'

import { AlertCircle, Film, ImageDown, Loader2, NotebookIcon, PenIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'

import { AccountPlatform } from '@/entities/account'
import { MediaType, PostStatus, PostType } from '@/entities/post'
import { AiButton } from '@/features/ai/generate-text-post'
import { GenericCard } from '@/shared/components/generic-card'
import { cn } from '@/shared/lib/utils'
import { Alert, AlertDescription } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import { Separator } from '@/shared/ui/separator'
import {
    maxRatio as INSTAGRAM_MAX_ASPECT,
    minRatio as INSTAGRAM_MIN_ASPECT,
} from '@/shared/utils/aspect-ratio-service'

import SelectVideoCoverDialog from '../../select-video-post-cover/ui/select-video-cover-dialog'
import { usePostContext } from '../context/use-post-context'

interface PostPreviewProps {
    onSuccess?: () => void
}

export const PostPreview = ({ onSuccess }: PostPreviewProps) => {
    const [mediaAspectRatios, setMediaAspectRatios] = useState<Record<string, number>>({})

    const {
        mediaType,
        previewUrls,
        setPreviewUrls,
        mainCaption,
        selectedAccounts,
        postType,
        isDraftLoading,
        isCreateLoading,
        isScheduleLoading,
        schedulePosts,
        draftPosts,
        publishPosts,
        shouldSchedule,
        onCoverDataSelect,
        coverData,
        scheduledPosts,
    } = usePostContext()

    const isInstagramSelected = useMemo(
        () => selectedAccounts.some((account) => account.platform === AccountPlatform.instagram),
        [selectedAccounts]
    )

    const hasSelectedAccounts = selectedAccounts.length > 0
    const hasMediaAttached = previewUrls.length > 0
    const requiresMediaForPost = postType === PostType.media
    const isMissingRequiredMedia = requiresMediaForPost && !hasMediaAttached
    const isAiButtonDisabled = isDraftLoading || isCreateLoading || isScheduleLoading || !hasSelectedAccounts
    const isCreateActionDisabled =
        isDraftLoading || isCreateLoading || isScheduleLoading || !hasSelectedAccounts || isMissingRequiredMedia

    const clampInstagramAspect = (ratio: number) => {
        if (ratio < INSTAGRAM_MIN_ASPECT) return INSTAGRAM_MIN_ASPECT
        if (ratio > INSTAGRAM_MAX_ASPECT) return INSTAGRAM_MAX_ASPECT
        return ratio
    }

    const getAspectRatioForUrl = (url: string) =>
        clampInstagramAspect(mediaAspectRatios[url] ?? INSTAGRAM_MIN_ASPECT)

    const handleImageLoaded = (url: string) => (img: { naturalWidth: number; naturalHeight: number }) => {
        const ratio = img.naturalWidth / img.naturalHeight
        setMediaAspectRatios((prev) => {
            if (prev[url] === ratio) return prev
            return { ...prev, [url]: ratio }
        })
    }

    const handleCreatePost = async (_publishNow?: boolean, status?: PostStatus) => {
        try {
            if (status === PostStatus.DRAFT) await draftPosts()
            else if (shouldSchedule) await schedulePosts()
            else await publishPosts()

            onSuccess?.()
        } catch (error) {
            console.error('Failed to create posts:', error)
        }
    }

    const getActionLabel = (scheduleLabel: string, defaultLabel: string) => {
        if (isCreateLoading) return 'Creating...'
        if (isScheduleLoading) return 'Scheduling...'
        return shouldSchedule ? scheduleLabel : defaultLabel
    }

    const postPreviewContent = (
        <div className="flex flex-col w-full flex-1 min-h-0 gap-3">
            {previewUrls.length === 1 && (
                <>
                    <div
                        style={{ aspectRatio: getAspectRatioForUrl(previewUrls[0]) }}
                        className={cn(
                            `w-full rounded-2xl overflow-hidden flex items-center justify-center bg-muted/40 relative`,
                            mediaType === MediaType.VIDEO && ''
                        )}
                    >
                        {mediaType === MediaType.IMAGE ? (
                            <Image
                                fill
                                alt="Post preview"
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 400px"
                                src={previewUrls[0]}
                                onLoadingComplete={handleImageLoaded(previewUrls[0])}
                            />
                        ) : (
                            <video controls className="h-full w-full object-contain" src={previewUrls[0]} />
                        )}
                    </div>

                    {mediaType === MediaType.VIDEO && (
                        <>
                            <SelectVideoCoverDialog
                                setVideoCoverImage={onCoverDataSelect}
                                videoSrc={previewUrls[0]}
                            >
                                <Button className="w-full" size={'lg'}>
                                    <ImageDown />
                                    Select Cover Image
                                </Button>
                            </SelectVideoCoverDialog>

                            {/* Show cover selection status */}
                            {(coverData.imagePreviewUrl || coverData.timestamp) && (
                                <div className="w-full p-3 bg-muted rounded-lg">
                                    <p className="text-sm font-medium mb-2">Video Cover:</p>
                                    {coverData.timestamp && (
                                        <p className="text-sm text-muted-foreground">
                                            Timestamp: {coverData.timestamp.toFixed(1)}s
                                        </p>
                                    )}
                                    {coverData.imagePreviewUrl && (
                                        <p className="text-sm text-muted-foreground">Custom Image: Selected</p>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                    <Button className="w-full" size="lg" variant="destructive" onClick={() => setPreviewUrls([])}>
                        <Trash2 />
                        Clear media
                    </Button>
                    <Separator />
                </>
            )}

            {previewUrls.length > 1 && (
                <>
                    <Carousel className="w-full max-w-md">
                        <CarouselContent>
                            {previewUrls.map((previewUrl) => (
                                <CarouselItem key={previewUrl}>
                                    <div className="p-2">
                                        <div
                                            className="flex items-center justify-center overflow-hidden rounded-lg bg-muted/40 relative"
                                            style={{ aspectRatio: getAspectRatioForUrl(previewUrl) }}
                                        >
                                            <Image
                                                fill
                                                alt="Post preview"
                                                className="object-contain"
                                                sizes="(max-width: 768px) 100vw, 400px"
                                                src={previewUrl}
                                                onLoadingComplete={handleImageLoaded(previewUrl)}
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-4" />
                        <CarouselNext className="-right-4" />
                    </Carousel>
                    <Button
                        className="w-full mt-3"
                        size="lg"
                        variant="destructive"
                        onClick={() => setPreviewUrls([])}
                    >
                        <Trash2 />
                        Clear media
                    </Button>
                </>
            )}

            {isMissingRequiredMedia && (
                <Alert className="mb-4" variant="warning">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Please add media to create a media post</AlertDescription>
                </Alert>
            )}

            {mainCaption && (
                <div className="w-full">
                    <h3 className="text-sm font-medium mb-2">Caption</h3>
                    <p className="text-sm text-muted-foreground">{mainCaption}</p>
                </div>
            )}

            {isInstagramSelected && (
                <p className="text-xs text-muted-foreground">
                    Instagram preview is locked to the feed range 4:5 – 1.91:1 (using detected ratio{' '}
                    {getAspectRatioForUrl(previewUrls[0] ?? '')?.toFixed(2) ?? '0.80'}).
                </p>
            )}

            {selectedAccounts.length > 0 && (
                <>
                    <div className="w-full">
                        <h3 className="text-sm font-medium mb-2">Selected Platforms</h3>
                        <div className="flex flex-wrap gap-3">
                            {selectedAccounts.map((account) => (
                                <span
                                    key={account.id}
                                    className="text-xs bg-primary/80 px-2 py-1 rounded-full text-white"
                                >
                                    {account.username}
                                </span>
                            ))}
                        </div>
                    </div>
                    <Separator />
                </>
            )}

            <div className="w-full mt-auto flex flex-col gap-3 pb-2">
                <AiButton accounts={selectedAccounts} isDisabled={isAiButtonDisabled} onSubmit={() => undefined} />
                <Button
                    className="w-full"
                    disabled={isCreateActionDisabled}
                    size="lg"
                    variant={'outline'}
                    onClick={() => handleCreatePost(false, PostStatus.DRAFT)}
                >
                    {isDraftLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PenIcon />}
                    {isDraftLoading ? 'Creating Draft...' : 'Draft Post'}
                </Button>

                {postType === PostType.media && hasMediaAttached && (
                    <Button
                        className="w-full"
                        disabled={isCreateActionDisabled}
                        size="lg"
                        onClick={() => handleCreatePost()}
                    >
                        {isCreateLoading || isScheduleLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Film />
                        )}
                        {getActionLabel('Schedule Post', 'Publish Now')}
                    </Button>
                )}

                {postType === PostType.text && scheduledPosts.find((post) => post.text) && (
                    <Button
                        className="w-full"
                        disabled={isCreateActionDisabled}
                        size="lg"
                        onClick={() => handleCreatePost()}
                    >
                        {isCreateLoading || isScheduleLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <NotebookIcon />
                        )}
                        {getActionLabel('Schedule Text Post', 'Create Text Post')}
                    </Button>
                )}
            </div>
        </div>
    )

    return (
        <GenericCard
            cardContainerClassName="border border-primary rounded-md p-4 gap-[18px] h-full w-full flex"
            cardContent={postPreviewContent}
            cardContentClassName="flex-1 min-h-0 flex flex-col"
            cardTitle={'Preview'}
        />
    )
}
