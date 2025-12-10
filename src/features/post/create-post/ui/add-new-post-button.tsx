'use client'

import React, { useMemo, useState } from 'react'

import { NotebookText, Plus, PlusIcon, VideoIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
import { formatISO } from 'date-fns'

import { MediaPostForm, PostPreview, TextPostForm } from '@/features/post/create-post'
import { postApi } from '@/entities/post'
import { GenericDialog } from '@/shared/components'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

import { PostProvider } from '../context/use-post-context'

type TriggerButtonProps = Omit<React.ComponentProps<typeof Button>, 'children'>

interface AddNewPostButtonProps {
    buttonLabel?: string
    buttonIcon?: React.ReactNode
    buttonProps?: TriggerButtonProps
    copyData?: string
    initialTimezone?: string
    dialogTitle?: string
    dialogDescription?: string
    isIconButton?: boolean
    selectedDate?: Date
}

export const AddNewPostButton = ({
    buttonLabel = 'New post',
    buttonIcon,
    buttonProps,
    copyData,
    initialTimezone,
    isIconButton = false,
    dialogTitle = 'Create new post',
    dialogDescription = 'Draft, schedule, or publish content without leaving your calendar.',
    selectedDate,
}: AddNewPostButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dialogKey, setDialogKey] = useState(0)
    const dispatch = useDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()

    const scheduledDateFromUrl = searchParams?.get('scheduledDate')
    const initialScheduledDate = selectedDate ?? (scheduledDateFromUrl ? new Date(scheduledDateFromUrl) : undefined)

    const triggerButton = useMemo(
        () => (
            <Button
                {...buttonProps}
                className={cn('flex items-center justify-center gap-2', buttonProps?.className)}
                type={buttonProps?.type ?? 'button'}
                onClick={(event) => {
                    buttonProps?.onClick?.(event)
                    if (selectedDate) {
                        const params = new URLSearchParams(searchParams?.toString())
                        params.set('scheduledDate', formatISO(selectedDate, { representation: 'date' }))
                        router.replace(`?${params.toString()}`, { scroll: false })
                    }
                    setIsOpen(true)
                }}
            >
                {buttonIcon ?? <Plus className="size-4" />}
                {buttonLabel}
            </Button>
        ),
        [buttonIcon, buttonLabel, buttonProps]
    )

    const triggerIconButton = (
        <Button
            className="size-6"
            size={'icon'}
            variant={'outline'}
            onClick={(event) => {
                buttonProps?.onClick?.(event)
                if (selectedDate) {
                    const params = new URLSearchParams(searchParams?.toString())
                    params.set('scheduledDate', formatISO(selectedDate, { representation: 'date' }))
                    router.replace(`?${params.toString()}`, { scroll: false })
                }
                setIsOpen(true)
            }}
        >
            <PlusIcon size={12} />
        </Button>
    )

    const handleSuccess = () => {
        setIsOpen(false)
        setDialogKey((prev) => prev + 1)
        dispatch(postApi.util.invalidateTags(['PostsByDate', 'PostLimits', 'FailedPosts']))
    }

    const dialogContent = (
        <PostProvider
            key={dialogKey}
            copyData={copyData}
            initialScheduledDate={initialScheduledDate}
            initialTimezone={initialTimezone}
        >
            <div className="flex flex-col gap-4 w-full">
                <Tabs className="w-full flex flex-col gap-4" defaultValue="media">
                    <TabsList className="w-full">
                        <TabsTrigger className="flex items-center gap-2" value="media">
                            <VideoIcon className="size-4" />
                            Media Post
                        </TabsTrigger>
                        <TabsTrigger className="flex items-center gap-2" value="text">
                            <NotebookText className="size-4" />
                            Text Post
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="media">
                        <MediaPostForm copyData={copyData} />
                    </TabsContent>

                    <TabsContent value="text">
                        <TextPostForm copyData={copyData} />
                    </TabsContent>
                </Tabs>

                <PostPreview onSuccess={handleSuccess} />
            </div>
        </PostProvider>
    )

    return (
        <GenericDialog
            className="!max-w-4xl max-h-[90vh] overflow-y-auto"
            dialogContent={dialogContent}
            dialogHeaderDescription={dialogDescription}
            dialogHeaderTitle={dialogTitle}
            dialogOpen={isOpen}
            dialogTriggerComp={isIconButton ? triggerIconButton : triggerButton}
            onDialogOpenChange={(open) => {
                setIsOpen(open)
                if (!open) setDialogKey((prev) => prev + 1)
            }}
        />
    )
}
