'use client'

import React from 'react'

import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { If } from '@/shared/components/if'
import { Button } from '@/shared/ui/button'
import LoadingIndicator from '@/shared/ui/loading-indicator'

import useCalendarService from '../model/use-calendar-service'

import { DesktopCalendarView } from './desktop-calendar-view'
import { MobileCalendarView } from './mobile-calendar-view'

const Calendar = () => {
    const {
        currentDate,
        days,
        view,
        selectedDayPosts,
        postsByDate,
        maxPostsToShow,
        setView,
        handleNext,
        handlePrev,
        setSelectedDayPosts,
        isLoading,
        isToday,
        isMobile,
    } = useCalendarService()

    if (isLoading || typeof isMobile === 'undefined') return <LoadingIndicator />

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <Button className="px-2 py-1" onClick={handlePrev}>
                    <ChevronLeft />
                    Prev
                </Button>
                <h2 className="font-bold text-lg">{format(currentDate, 'MMMM yyyy')}</h2>
                <Button className="px-2 py-1" onClick={handleNext}>
                    Next
                    <ChevronRight />
                </Button>
            </div>

            <If
                condition={isMobile}
                fallback={
                    <DesktopCalendarView
                        currentDate={currentDate}
                        days={days}
                        isToday={isToday}
                        maxPostsToShow={maxPostsToShow}
                        postsByDate={postsByDate}
                        selectedDayPosts={selectedDayPosts}
                        setSelectedDayPosts={setSelectedDayPosts}
                        setView={setView}
                        view={view}
                    />
                }
            >
                <MobileCalendarView
                    days={days}
                    isToday={isToday}
                    maxPostsToShow={maxPostsToShow}
                    postsByDate={postsByDate}
                    selectedDayPosts={selectedDayPosts}
                    setSelectedDayPosts={setSelectedDayPosts}
                />
            </If>
        </div>
    )
}

export default Calendar
