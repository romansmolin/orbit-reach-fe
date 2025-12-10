'use client'

import { useEffect, useState } from 'react'

import { ChevronDownIcon, InfoIcon } from 'lucide-react'

import { Account } from '@/entities/account'
import { ScheduledDate } from '@/entities/post'
import { GenericCard } from '@/shared/components/generic-card'
import { cn } from '@/shared/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Switch } from '@/shared/ui/switch'

interface PostSchedulerProps {
    selectedAccounts: Account[]
    onPostDateTimeChange: (date: Date | null, time: string | null) => void
    scheduledTime: ScheduledDate
    setShouldSchedule: (val: boolean) => void
    shouldSchedule: boolean
}

export const PostScheduler = ({
    selectedAccounts: _selectedAccounts,
    onPostDateTimeChange,
    scheduledTime,
    setShouldSchedule,
    shouldSchedule,
}: PostSchedulerProps) => {
    const [popoverContainer, setPopoverContainer] = useState<HTMLElement | null>(null)

    useEffect(() => {
        const dialogContents = document.querySelectorAll<HTMLElement>('[data-slot="dialog-content"]')
        const latestDialogContent = dialogContents[dialogContents.length - 1]
        setPopoverContainer(latestDialogContent ?? null)
    }, [])

    const postSchedulerContent = (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h2 className="leading-none font-bold text-primary dark:text-white">Should be scheduled?</h2>
                <Switch checked={shouldSchedule} onCheckedChange={() => setShouldSchedule(!shouldSchedule)} />
            </div>

            {shouldSchedule && (
                <div className="flex flex-col gap-5 sm:flex-row w-full">
                    <div className="flex flex-col gap-3 flex-1 cursor-pointer ">
                        <Label className="px-1" htmlFor={`date-picker`}>
                            Date
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    className="justify-between text-black bg-background dark:bg-primary/20 font-normal dark:text-white hover:border-none hover:bg-background hover:text-inherit !duration-300 !transition-all"
                                    id={`date-picker`}
                                >
                                    {scheduledTime.date.toLocaleDateString() || 'Select date'}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                align="start"
                                className="w-auto overflow-hidden p-0"
                                container={popoverContainer ?? undefined}
                            >
                                <Calendar
                                    mode="single"
                                    selected={scheduledTime.date}
                                    onSelect={(date) => {
                                        if (date) {
                                            onPostDateTimeChange(date, null)
                                        }
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex flex-col gap-3 flex-1">
                        <Label className="px-1" htmlFor={`time-picker`}>
                            Time
                        </Label>
                        <Input
                            className="bg-background cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            id={`time-picker`}
                            step="1"
                            type="time"
                            value={scheduledTime.time}
                            onChange={(e) => onPostDateTimeChange(null, e.target.value)}
                        />
                    </div>
                </div>
            )}
        </div>
    )

    return (
        <>
            <Alert variant="info">
                <InfoIcon className="!size-5" />
                <AlertTitle>Scheduling</AlertTitle>
                <AlertDescription>
                    You can choose to post immediately or schedule for later. Scheduled times are approximate and
                    may be affected by external factors. Please double-check time-sensitive posts.
                </AlertDescription>
            </Alert>
            <GenericCard
                cardContent={postSchedulerContent}
                cardContainerClassName={cn(
                    'flex p-5 rounded-md border border-primary gap-0',
                    shouldSchedule && 'gap-4'
                )}
            />
        </>
    )
}
