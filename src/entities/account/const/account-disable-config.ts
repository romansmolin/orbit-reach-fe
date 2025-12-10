import { MediaType, PostType } from '@/entities/post'

import { AccountPlatform } from '../model/account.interface'

export interface DisableRule {
    condition: (context: DisableContext) => boolean
    message: string
}

export interface DisableContext {
    mediaType?: MediaType
    postType?: PostType
    platform: AccountPlatform
    hasMedia?: boolean
    [key: string]: any // Allow for future extensibility
}

// Platform-specific disable rules
export const accountDisableRules: Record<AccountPlatform, DisableRule[]> = {
    [AccountPlatform.youtube]: [
        {
            condition: (ctx) => ctx.mediaType === MediaType.IMAGE,
            message: 'YouTube does not support image posts. Please use video content.',
        },
        {
            condition: (ctx) => ctx.postType === PostType.text,
            message: 'YouTube requires video content. Text-only posts are not supported.',
        },
    ],
    [AccountPlatform.instagram]: [
        {
            condition: (ctx) => ctx.postType === PostType.text && !ctx.hasMedia,
            message: 'Instagram requires media content for posts.',
        },
    ],
    [AccountPlatform.tiktok]: [
        // {
        //     condition: (ctx) => ctx.mediaType === MediaType.IMAGE,
        //     message: 'TikTok requires video content. Images are not supported.',
        // },
        {
            condition: (ctx) => ctx.postType === PostType.text,
            message: 'TikTok requires video content. Text-only posts are not supported.',
        },
    ],
    [AccountPlatform.facebook]: [],
    [AccountPlatform.pinterest]: [
        {
            condition: (ctx) => ctx.postType === PostType.text && !ctx.hasMedia,
            message: 'Pinterest requires image content for posts.',
        },
    ],
    [AccountPlatform.x]: [],
    [AccountPlatform.threads]: [],
    [AccountPlatform.bluesky]: [],
    [AccountPlatform.linkedin]: []
}

// Helper function to check if an account should be disabled
export const isAccountDisabled = (platform: AccountPlatform, context: DisableContext): boolean => {
    const rules = accountDisableRules[platform] || []
    return rules.some((rule) => rule.condition({ ...context, platform }))
}

// Helper function to get the disable message for an account
export const getDisableMessage = (platform: AccountPlatform, context: DisableContext): string => {
    const rules = accountDisableRules[platform] || []
    const applicableRule = rules.find((rule) => rule.condition({ ...context, platform }))
    return applicableRule?.message || 'This account cannot be selected for the current post type.'
}

// Helper function to get all disabled accounts with their messages
export const getDisabledAccountsInfo = (
    accounts: { platform: AccountPlatform; id: string }[],
    context: Omit<DisableContext, 'platform'>
) => {
    return accounts.map((account) => ({
        ...account,
        isDisabled: isAccountDisabled(account.platform, { ...context, platform: account.platform }),
        disableMessage: getDisableMessage(account.platform, { ...context, platform: account.platform }),
    }))
}
