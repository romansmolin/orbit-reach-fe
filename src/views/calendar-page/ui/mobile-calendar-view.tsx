import React from 'react'

import { EachDayOfIntervalResult, format } from 'date-fns'

import { IPost } from '@/entities/post'
import { GenericCard } from '@/shared/components/generic-card'

import { DayCard } from './day-card'

type DayRecords = EachDayOfIntervalResult<
    {
        start: Date
        end: Date
    },
    undefined
>
interface MobileCalendarViewProps {
    postsByDate: Record<string, IPost[]>
    maxPostsToShow: number
    isToday: (date: Date) => boolean
    selectedDayPosts: IPost[] | null
    setSelectedDayPosts: React.Dispatch<React.SetStateAction<IPost[] | null>>
    days: DayRecords
}

export const MobileCalendarView = ({
    days,
    postsByDate,
    maxPostsToShow,
    isToday,
    selectedDayPosts,
    setSelectedDayPosts,
}: MobileCalendarViewProps) => {
    const totalScheduledPosts = React.useMemo(
        () => Object.values(postsByDate).reduce((acc, dayPosts) => acc + dayPosts.length, 0),
        [postsByDate]
    )
    return (
        <div className="flex flex-col gap-4">
            <GenericCard
                cardContainerClassName="shadow-sm"
                cardContent={
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Posts</p>
                        <p className="text-sm text-muted-foreground">
                            {totalScheduledPosts} scheduled {totalScheduledPosts === 1 ? 'post' : 'posts'}
                        </p>
                    </div>
                }
            />

            <div className="flex flex-col gap-3">
                {days.map((day) => {
                    const dayKey = format(day, 'yyyy-MM-dd')
                    const dayPosts = postsByDate[dayKey] || []
                    const hasMorePosts = dayPosts.length > maxPostsToShow
                    const dayIsToday = isToday(day)

                    return (
                        <DayCard
                            key={day.toISOString()}
                            day={day}
                            dayIsToday={dayIsToday}
                            dayPosts={dayPosts}
                            hasMorePosts={hasMorePosts}
                            maxPostsToShow={maxPostsToShow}
                            selectedDayPosts={selectedDayPosts}
                            setSelectedDayPosts={setSelectedDayPosts}
                        />
                    )
                })}
            </div>
        </div>
    )
}
