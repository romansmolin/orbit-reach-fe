import { AccountPlatform } from '../model/account.interface'

export const CUSTOM_MEDIA_LIMITS = {
    maxImages: 5,
    maxFileSizeMb: 50,
}

interface PlatformLimitConfig {
    captionLimit?: number
    textLimit?: number
    hashtagLimit?: number
    mentionLimit?: number
    titleLimit?: number
    descriptionLimit?: number
    maxImages?: number
    mediaLimit?: number
    videoDurationSec?: number
    videoSizeMb?: number
}

export const platformLimits: Partial<Record<AccountPlatform, PlatformLimitConfig>> = {
    [AccountPlatform.instagram]: {
        captionLimit: 2200,
        hashtagLimit: 30,
        mentionLimit: 3,
        maxImages: 10,
    },
    [AccountPlatform.tiktok]: {
        captionLimit: 2200,
        maxImages: 35,
        videoDurationSec: 600,
        videoSizeMb: 1024,
    },
    [AccountPlatform.threads]: {
        textLimit: 500,
        hashtagLimit: 1,
        mediaLimit: 20,
    },
    [AccountPlatform.pinterest]: {
        titleLimit: 100,
        descriptionLimit: 500,
    },
    [AccountPlatform.youtube]: {
        titleLimit: 100,
        descriptionLimit: 5000,
        videoDurationSec: 12 * 60 * 60,
        videoSizeMb: 256 * 1024,
    },
}
