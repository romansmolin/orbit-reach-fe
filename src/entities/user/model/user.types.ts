export interface IUser {
    id: string
    name: string
    email: string
    googleAuth: boolean
    avatar: string
    createdAt: string
    googleId: string
    trialEndsAt: string
    picture: string
}

export interface IPlan {
    id: string
    tenantId: string
    planName: string
    planType: 'monthly' | 'yearly'
    sendPostsLimit: number
    scheduledPostsLimit: number
    platformAllowed: string[]
    startDate: string
    endDate: string
    isActive: boolean
    accountsLimit: number
    subscriptionEndsAt: string
    billingStatus: 'active_until_period_end' | 'canceled' | 'active'
    canUpdateSubscription: boolean
    isPendingCancellation: boolean
    currentPeriodEnd: string
}

export interface IQuotaUsage {
    used: number
    limit: number
}

export interface IQuotaUsageData {
    sentPosts: IQuotaUsage
    scheduledPosts: IQuotaUsage
    connectedAccounts: IQuotaUsage
    aiRequests: IQuotaUsage
}

export interface IUserData {
    user: IUser
    plan: IPlan
    quotaUsage: IQuotaUsageData
}

export interface IUserSettings {
    timezone: string
}
