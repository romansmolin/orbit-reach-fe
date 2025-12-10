'use client'

import React, { ReactNode, useState } from 'react'

import { Image, ImageDownIcon, ShieldAlertIcon, Timer, Trash2 } from 'lucide-react'

import { GenericDialog } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { CustomMediaUploader } from '@/shared/ui/custom-media-uploader'
import { Slider } from '@/shared/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

import useSelectVideoCover from '../hook/use-select-video-cover'

interface CoverData {
    timestamp?: number
    image?: File
    imagePreviewUrl?: string
}

interface SelectVideoCoverDialogProps {
    videoSrc: string
    setVideoCoverImage: (cover: CoverData) => void
    children: ReactNode
}

const containerAspect = 'aspect-[4/5]'

const SelectVideoCoverDialog: React.FC<SelectVideoCoverDialogProps> = ({
    videoSrc,
    setVideoCoverImage,
    children,
}) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)

    const handleCloseDialog = () => setIsOpened(false)

    const {
        videoRef,
        duration,
        currentTime,
        handleLoadedMetadata,
        tempCover,
        handleClearImage,
        handleClearTimestamp,
        handleConfirmCover,
        handleTimestampChange,
        handleImageSelect,
    } = useSelectVideoCover(setVideoCoverImage, handleCloseDialog)

    const isConfirmDisabled = !tempCover.image && !tempCover.timestamp

    const dialogFooter = (
        <div className="w-full flex flex-col gap-2">
            {tempCover.image && (
                <Button size="lg" variant="destructive" onClick={handleClearImage}>
                    <Trash2 />
                    Clear Image
                </Button>
            )}
            <Button className="w-full" disabled={isConfirmDisabled} size={'lg'} onClick={handleConfirmCover}>
                <ImageDownIcon />
                Confirm Cover
            </Button>
        </div>
    )

    const dialogContent = (
        <Tabs className="w-full" defaultValue="timestamp">
            <TabsList className="w-full">
                <TabsTrigger value="timestamp">
                    <Timer />
                    Timestamp
                </TabsTrigger>
                <TabsTrigger value="image">
                    <Image />
                    Custom Image
                </TabsTrigger>
            </TabsList>

            <Alert variant="warning">
                <ShieldAlertIcon className="!size-5" />
                <AlertTitle>Platform Restrictions</AlertTitle>
                <AlertDescription>Keep in mind, only Instagram and TikTok can accept covers!</AlertDescription>
            </Alert>

            <TabsContent className="flex flex-col gap-4 flex-1 min-h-0" value="timestamp">
                <div
                    style={{ height: '400px' }}
                    className={cn(
                        `w-full rounded-2xl overflow-hidden flex items-center justify-center`,
                        containerAspect
                    )}
                >
                    <video
                        ref={videoRef}
                        className="max-w-full max-h-full object-contain rounded-2xl"
                        src={videoSrc}
                        onLoadedMetadata={handleLoadedMetadata}
                    />
                </div>

                {duration > 0 && (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center px-2">
                            <Slider
                                className="w-full"
                                max={duration}
                                step={0.1}
                                value={[tempCover.timestamp || currentTime]}
                                onValueChange={handleTimestampChange}
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Current: {(tempCover.timestamp || currentTime).toFixed(1)}s</span>
                            <span>Duration: {duration.toFixed(1)}s</span>
                        </div>
                        {tempCover.timestamp && (
                            <Button className="w-fit" size="sm" variant="outline" onClick={handleClearTimestamp}>
                                Clear Timestamp
                            </Button>
                        )}
                    </div>
                )}
            </TabsContent>

            <TabsContent className="flex flex-col gap-4" value="image">
                <CustomMediaUploader
                    onlyImage
                    showPreview
                    description="Please select cover image"
                    maxFiles={1}
                    previewUrls={tempCover.imagePreviewUrl ? [tempCover.imagePreviewUrl] : []}
                    onFileSelect={handleImageSelect}
                />
            </TabsContent>
        </Tabs>
    )
    return (
        <>
            <GenericDialog
                dialogContent={dialogContent}
                dialogFooter={dialogFooter}
                dialogHeaderDescription={'Select timestamp and/or custom image for your video cover!'}
                dialogHeaderTitle={'Video Cover'}
                dialogOpen={isOpened}
                dialogTriggerComp={children}
                onDialogOpenChange={setIsOpened}
            />
        </>
    )
}

export default SelectVideoCoverDialog
