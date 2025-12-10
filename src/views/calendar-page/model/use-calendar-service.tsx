'use client'

import { useEffect, useMemo, useState } from 'react'

import {
    addMonths,
    addWeeks,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isToday,
    startOfMonth,
    startOfWeek,
    subMonths,
    subWeeks,
} from 'date-fns'
import { toast } from 'sonner'

import { IPost } from '@/entities/post'
import { useGetPostsByDateQuery } from '@/entities/post/api/client/post.api'
import { useIsMobile } from '@/shared/lib/react/use-mobile'

const WEEK_STARTS_ON = 1 // Понедельник
const WEEK_POSTS_LIMIT = 6
const MONTH_POSTS_LIMIT = 2

const useCalendarService = () => {
    const isMobile = useIsMobile()

    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState<'month' | 'week'>('month')
    const [selectedDayPosts, setSelectedDayPosts] = useState<IPost[] | null>(null)

    const start = useMemo(
        () => startOfWeek(startOfMonth(currentDate), { weekStartsOn: WEEK_STARTS_ON }),
        [currentDate]
    )

    const end = useMemo(() => endOfWeek(endOfMonth(currentDate), { weekStartsOn: WEEK_STARTS_ON }), [currentDate])

    const {
        data: postsResponse,
        isLoading: isPostsLoading,
        isError: isPostsError,
    } = useGetPostsByDateQuery({ fromDate: start.getTime(), toDate: end.getTime() }, { skip: !start || !end })

    useEffect(() => {
        if (isPostsError) {
            toast.error('Failed to load posts!')
        }
    }, [isPostsError])

    const days = useMemo(
        () =>
            view === 'month'
                ? eachDayOfInterval({ start, end })
                : eachDayOfInterval({
                      start: startOfWeek(currentDate, { weekStartsOn: WEEK_STARTS_ON }),
                      end: endOfWeek(currentDate, { weekStartsOn: WEEK_STARTS_ON }),
                  }),
        [view, start, end, currentDate]
    )

    const postsByDate = useMemo(() => {
        const posts = postsResponse?.posts ?? []
        return posts.reduce(
            (acc, post) => {
                const day = format(new Date(post.scheduledTime), 'yyyy-MM-dd')
                if (!acc[day]) acc[day] = []
                acc[day].push(post)
                return acc
            },
            {} as Record<string, IPost[]>
        )
    }, [postsResponse])

    const handlePrev = () =>
        view === 'week' ? setCurrentDate(subWeeks(currentDate, 1)) : setCurrentDate(subMonths(currentDate, 1))

    const handleNext = () =>
        view === 'week' ? setCurrentDate(addWeeks(currentDate, 1)) : setCurrentDate(addMonths(currentDate, 1))

    const maxPostsToShow = view === 'week' ? WEEK_POSTS_LIMIT : MONTH_POSTS_LIMIT

    return {
        currentDate,
        view,
        selectedDayPosts,
        days,
        postsByDate,
        maxPostsToShow,

        setView,
        handlePrev,
        handleNext,
        setSelectedDayPosts,
        isLoading: isPostsLoading,
        isToday,
        isMobile,
    }
}

export default useCalendarService
