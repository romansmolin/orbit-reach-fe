import React from 'react'

import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import { UserLimitsCard, UserSettingsCard } from '@/entities/user'
import { getUserInfo, getUserSettingsByUserId } from '@/entities/user/server'
import { CancelSubscriptionButton, UpdateSubscriptionButton } from '@/features/subscription'
import { UserSettingsForm } from '@/features/user'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

const prefetchUserSettings = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) notFound()

    const { userSettings } = await getUserSettingsByUserId(token.value)
    const { userInfo } = await getUserInfo(token.value)

    return { userSettings, userInfo }
}

export const SettingsPage = async () => {
    const { userSettings, userInfo } = await prefetchUserSettings()

    if (!userInfo || !userSettings) return

    const { planName, planType, isPendingCancellation, canUpdateSubscription: canUpdate } = userInfo.plan
    const normalizedPlanName = planName?.trim().toLowerCase()
    const isFreePlan = !normalizedPlanName || normalizedPlanName === 'free'

    const quotaUsage = userInfo?.quotaUsage

    return (
        <Tabs defaultValue="personal">
            <TabsList className="w-full mb-5">
                <TabsTrigger value={'personal'}>Personal Settings</TabsTrigger>
                <TabsTrigger value={'platform'}>Platform Settings</TabsTrigger>
            </TabsList>
            <TabsContent className="flex flex-col gap-5" value={'personal'}>
                {userInfo?.plan && (
                    <UserSettingsCard
                        cancelSubscription={!isPendingCancellation && <CancelSubscriptionButton />}
                        userPlan={userInfo.plan}
                        updateSubscription={
                            (isFreePlan || canUpdate) && (
                                <UpdateSubscriptionButton
                                    currentPlanName={planName}
                                    currentPlanType={planType}
                                    requiresCheckout={isFreePlan}
                                />
                            )
                        }
                    />
                )}

                {quotaUsage && <UserLimitsCard isLoading={false} quotaUsage={quotaUsage} />}
            </TabsContent>
            <TabsContent value={'platform'}>
                <UserSettingsForm initialSetting={userSettings.settings} />
            </TabsContent>
        </Tabs>
    )
}
