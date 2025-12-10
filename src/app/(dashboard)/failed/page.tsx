import React, { Suspense } from 'react'

import LoadingIndicator from '@/shared/ui/loading-indicator'
import { FailedPage } from '@/views/failed'

const Failed = () => {
    return (
        <Suspense fallback={<LoadingIndicator />}>
            <FailedPage />
        </Suspense>
    )
}

export default Failed
