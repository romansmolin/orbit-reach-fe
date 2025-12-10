import React, { Suspense } from 'react'

import LoadingIndicator from '@/shared/ui/loading-indicator'
import { Calendar } from '@/views/calendar-page'

const CalendarPage = () => {
    return (
        <div className="w-full h-full py-4">
            <div className="mb-6 flex flex-col gap-1 px-6">
                <h1 className="text-2xl font-bold">Calendar</h1>
                <p>Click on post to see details and make changes</p>
            </div>

            <Suspense fallback={<LoadingIndicator />}>
                <Calendar />
            </Suspense>
        </div>
    )
}

export default CalendarPage
