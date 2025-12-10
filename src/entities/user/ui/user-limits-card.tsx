'use client'

import React, { useState } from 'react'

import { GenericCard } from '@/shared/components/generic-card'
import { Button } from '@/shared/ui/button'
import { Progress } from '@/shared/ui/progress'
import { Skeleton } from '@/shared/ui/skeleton'

import { IQuotaUsageData } from '../model/user.types'

interface UserLimitsCardProps {
    isLoading: boolean
    quotaUsage?: IQuotaUsageData
    defaultCollapsed?: boolean
}

interface QuotaRowProps {
    label: string
    used?: number
    limit?: number
}

const QuotaRow = ({ label, used = 0, limit = 0 }: QuotaRowProps) => (
    <div className="flex flex-col gap-1">
        <span className="text-sm">
            {label}: {used} / {limit}
        </span>
        <Progress value={limit ? (used / limit) * 100 : 0} />
    </div>
)

const SkeletonRows = () => (
    <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-2 w-full" />
        </div>
        <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-2 w-full" />
        </div>
        <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-2 w-full" />
        </div>
    </div>
)

export const UserLimitsCard = ({ isLoading, quotaUsage, defaultCollapsed = true }: UserLimitsCardProps) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed)

    const handleToggle = () => setIsCollapsed((prev) => !prev)
    const cardContainerClassName = `${isCollapsed ? 'gap-0' : 'gap-2'} p-4 flex flex-col justify-center`

    const cardHeader = (
        <div className="flex items-center justify-between w-full">
            <p className="text-base font-semibold">Limits</p>
            <Button className="p-0" size="sm" variant="ghost" onClick={handleToggle}>
                {isCollapsed ? 'Expand' : 'Collapse'}
            </Button>
        </div>
    )

    const cardContent = !isCollapsed && (
        <div className="flex flex-col gap-3">
            {isLoading ? (
                <SkeletonRows />
            ) : (
                <>
                    <QuotaRow
                        label="Posts limit"
                        limit={quotaUsage?.sentPosts?.limit}
                        used={quotaUsage?.sentPosts?.used}
                    />
                    <QuotaRow
                        label="Schedules limit"
                        limit={quotaUsage?.scheduledPosts?.limit}
                        used={quotaUsage?.scheduledPosts?.used}
                    />
                    {quotaUsage?.aiRequests && quotaUsage.aiRequests.limit > 0 && (
                        <QuotaRow
                            label="AI Usage"
                            limit={quotaUsage.aiRequests.limit}
                            used={quotaUsage.aiRequests.used}
                        />
                    )}
                    <QuotaRow
                        label="Accounts"
                        limit={quotaUsage?.connectedAccounts?.limit}
                        used={quotaUsage?.connectedAccounts?.used}
                    />
                </>
            )}
        </div>
    )

    return (
        <GenericCard
            cardContainerClassName={cardContainerClassName}
            cardContent={cardContent}
            cardHeader={cardHeader}
        />
    )
}
