import React, { ReactNode } from 'react'

import { GenericCard } from '@/shared/components/generic-card'
import { cn } from '@/shared/lib/utils'
import { Badge } from '@/shared/ui/badge'
import { Separator } from '@/shared/ui/separator'
import { formatDate } from '@/shared/utils/date-utils'

import { IPlan } from '../model/user.types'

interface UserSettingsCardProps {
    userPlan: IPlan
    cancelSubscription?: ReactNode
    updateSubscription?: ReactNode
    cancelNewsletter?: ReactNode
}

export const UserSettingsCard = ({
    userPlan,
    cancelSubscription,
    updateSubscription,
    cancelNewsletter,
}: UserSettingsCardProps) => {
    const billingCycleLabel = userPlan.planType === 'monthly' ? 'Monthly' : 'Yearly'
    const hasActions = Boolean(cancelSubscription || updateSubscription || cancelNewsletter)
    const startDate = formatDate(userPlan.startDate) || 'Not available'
    const endDate = formatDate(userPlan.currentPeriodEnd) || 'Not available'

    const planLimits = [
        {
            label: 'Sent posts limit',
            value: userPlan.sendPostsLimit.toLocaleString(),
        },
        {
            label: 'Scheduled posts limit',
            value: userPlan.scheduledPostsLimit.toLocaleString(),
        },
        {
            label: 'Accounts limit',
            value: userPlan.accountsLimit.toLocaleString(),
        },
    ]

    const cardContent = (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Plan: {userPlan.planName}</h2>
                <Badge className={cn(userPlan.isActive ? 'bg-green-300' : 'bg-red-300')}>
                    {userPlan.isActive ? 'Active' : 'Not active'}
                </Badge>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem label="Billing cycle" value={billingCycleLabel} />
                <InfoItem label="Plan type" value={userPlan.planType === 'monthly' ? 'Recurring' : 'Prepaid'} />
                <InfoItem label="Start date" value={startDate} />
                <InfoItem label="End date" value={endDate} />
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold">Usage limits</span>
                <div className="grid gap-3 sm:grid-cols-3">
                    {planLimits.map((limit) => (
                        <InfoItem key={limit.label} label={limit.label} value={limit.value} />
                    ))}
                </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold">Available platforms</span>
                <div className="flex flex-wrap gap-2">
                    {userPlan.platformAllowed.length ? (
                        userPlan.platformAllowed.map((platform) => (
                            <Badge key={platform} variant="outline">
                                {platform}
                            </Badge>
                        ))
                    ) : (
                        <span className="text-sm text-muted-foreground">No platforms assigned</span>
                    )}
                </div>
            </div>
        </div>
    )

    const cardFooter = hasActions && (
        <div className="flex flex-wrap items-center gap-3 w-full justify-end">
            {updateSubscription}
            {cancelSubscription}
            {cancelNewsletter}
        </div>
    )

    return (
        <GenericCard
            cardContainerClassName="gap-6 p-6"
            cardContent={cardContent}
            cardFooter={cardFooter}
            cardTitle="User Plan Settings"
        />
    )
}

const InfoItem = ({ label, value }: { label: string; value: ReactNode }) => (
    <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="text-sm font-medium">{value}</span>
    </div>
)
