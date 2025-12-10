import React from 'react'

import { EachDayOfIntervalResult, format, isSameMonth } from 'date-fns'
import { Calendar1, CalendarDays } from 'lucide-react'

import { IPost, PostMinimalisticCards } from '@/entities/post'
import { AddNewPostButton } from '@/features/post/create-post'
import { EditPostWrapper } from '@/features/post/edit-post'
import { ShowPostsDialog } from '@/features/post/show-posts'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

interface DesktopCalendarViewProps {
    postsByDate: Record<string, IPost[]>
    maxPostsToShow: number
    isToday: (date: Date) => boolean
    selectedDayPosts: IPost[] | null
    setSelectedDayPosts: React.Dispatch<React.SetStateAction<IPost[] | null>>
    days: EachDayOfIntervalResult<
        {
            start: Date
            end: Date
        },
        undefined
    >
    currentDate: Date
    view: 'month' | 'week'
    setView: (view: 'month' | 'week') => void
}

export const DesktopCalendarView = ({
    days,
    currentDate,
    view,
    isToday,
    postsByDate,
    maxPostsToShow,
    setSelectedDayPosts,
    selectedDayPosts,
    setView,
}: DesktopCalendarViewProps) => {
    return (
        <>
            <div className="flex justify-center gap-2 mb-4">
                <Button variant={view === 'month' ? 'default' : 'outline'} onClick={() => setView('month')}>
                    <CalendarDays />
                    Month
                </Button>
                <Button variant={view === 'week' ? 'default' : 'outline'} onClick={() => setView('week')}>
                    <Calendar1 />
                    Week
                </Button>
            </div>
            <div className="overflow-x-auto">
                {/* Header Row */}
                <div className="min-w-[1200px] xl:min-w-[700px] grid grid-cols-7 gap-1 text-center mb-1">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="font-semibold">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div
                    className={`min-w-[1200px] xl:min-w-[700px] grid grid-cols-7 gap-0.5 sm:gap-1 text-center ${view === 'week' ? 'h-[calc(100vh-200px)]' : ''}`}
                >
                    {days.map((day) => {
                        const isCurrentMonth = isSameMonth(day, currentDate)
                        return (
                            <div
                                key={day.toISOString()}
                                className={cn(
                                    'border p-1 sm:p-2 rounded min-w-[140px]',
                                    view === 'week' ? 'h-full flex items-start' : 'h-46',
                                    isToday(day) && 'border-primary',
                                    !isCurrentMonth && 'opacity-50 pointer-events-none'
                                )}
                            >
                                    <div className="flex flex-col items-start w-full h-full">
                                        <div className="flex justify-between items-center w-full">
                                            <span className="text-sm font-semibold">{format(day, 'd')}</span>
                                            <AddNewPostButton isIconButton selectedDate={day} />
                                    </div>
                                    <div className="mt-1 flex flex-col gap-1 w-full">
                                        {(postsByDate[format(day, 'yyyy-MM-dd')] || [])
                                            .slice(0, maxPostsToShow)
                                            .map((post) => (
                                                <EditPostWrapper key={post.postId} post={post}>
                                                    <PostMinimalisticCards post={post} />
                                                </EditPostWrapper>
                                            ))}
                                        {(postsByDate[format(day, 'yyyy-MM-dd')] || []).length >
                                            maxPostsToShow && (
                                            <ShowPostsDialog
                                                // @ts-ignore
                                                dialogHeaderTitle={`All posts for ${format(day, 'PPP')}`}
                                                posts={selectedDayPosts || []}
                                                triggerButton={
                                                    <Button
                                                        className="text-xs pt-0 text-blue-400 underline"
                                                        variant={'link'}
                                                        onClick={() =>
                                                            setSelectedDayPosts(
                                                                postsByDate[format(day, 'yyyy-MM-dd')]
                                                            )
                                                        }
                                                    >
                                                        +
                                                        {(postsByDate[format(day, 'yyyy-MM-dd')] || []).length -
                                                            maxPostsToShow}
                                                        more
                                                    </Button>
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
