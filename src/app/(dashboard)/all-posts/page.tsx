import React, { Suspense } from 'react'

import { IPostFilters } from '@/entities/post'
import LoadingIndicator from '@/shared/ui/loading-indicator'
import { AllPostsPage } from '@/views/all-posts'

export const revalidate = 0

interface AllPostsProps {
    searchParams: Promise<IPostFilters>
}

const AllPosts: React.FC<AllPostsProps> = async ({ searchParams }) => {
    const { platform, status, fromDate, toDate, page } = await searchParams
    const currentPage = page ? parseInt(page) : 1
    return (
        <>
            <div className="mb-6 flex flex-col gap-1">
                <h1 className="text-2xl font-bold">See Yours Posts</h1>
            </div>

            <Suspense fallback={<LoadingIndicator />}>
                <AllPostsPage
                    currentPage={currentPage}
                    filters={{
                        platform,
                        status,
                        fromDate,
                        toDate,
                    }}
                />
            </Suspense>
        </>
    )
}

export default AllPosts
