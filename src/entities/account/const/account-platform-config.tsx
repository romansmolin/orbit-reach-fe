import { Facebook, Instagram, Twitter } from 'lucide-react'

import BlueskyIcon from '@/shared/icon/bluesky-icon'
import LinkedinIcon from '@/shared/icon/linkedin-icon'
import PinterestIcon from '@/shared/icon/pinterest-icon'
import ThreadsIcon from '@/shared/icon/threads-icon'
import TikTokIcon from '@/shared/icon/tik-tok-icon'
import YouTubeIcon from '@/shared/icon/youtube-icon'

import { AccountPlatform } from '../model/account.interface'

interface PlatformConfig {
    icon: React.ComponentType<{ className?: string }> | React.ReactElement
    badgeColor: string
    maxCaption: number
    maxTitle?: number
    maxTags?: number
    maxLinks?: number
    supportsTags: boolean
    supportsLinks: boolean
    supportsTitles: boolean
    supportsAutoMusic: boolean
}

export const accountsPlatformConfig: Record<AccountPlatform, PlatformConfig> = {
    facebook: {
        icon: Facebook,
        badgeColor: 'bg-blue-500',
        maxCaption: 63206,
        maxTitle: 100,
        supportsTags: false,
        supportsLinks: false,
        supportsTitles: true,
        supportsAutoMusic: false,
    },
    instagram: {
        icon: Instagram,
        badgeColor: 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
        maxCaption: 2200,
        supportsTags: true,
        supportsLinks: false,
        supportsTitles: false,
        supportsAutoMusic: false,
    },
    threads: {
        icon: ThreadsIcon,
        badgeColor: 'bg-black',
        maxCaption: 500,
        maxTags: 1,
        maxLinks: 1,
        supportsTags: true,
        supportsLinks: true,
        supportsTitles: false,
        supportsAutoMusic: false,
    },
    tiktok: {
        icon: TikTokIcon,
        badgeColor: 'bg-black',
        maxCaption: 2200,
        maxTitle: 100,
        supportsTags: true,
        supportsLinks: false,
        supportsTitles: true,
        supportsAutoMusic: true,
    },
    youtube: {
        icon: YouTubeIcon,
        badgeColor: 'bg-red-500',
        maxCaption: 5000,
        supportsTags: false,
        supportsLinks: false,
        supportsTitles: false,
        supportsAutoMusic: false,
    },
    bluesky: {
        icon: BlueskyIcon,
        badgeColor: 'bg-blue-500',
        maxCaption: 300,
        supportsTags: true,
        maxLinks: 1,
        supportsLinks: true,
        supportsTitles: false,
        supportsAutoMusic: false,
    },
    x: {
        icon: Twitter,
        badgeColor: 'bg-black',
        maxCaption: 280,
        supportsTags: true,
        supportsLinks: false,
        supportsTitles: false,
        supportsAutoMusic: false,
    },
    pinterest: {
        icon: PinterestIcon,
        badgeColor: 'bg-[#E60023]',
        maxCaption: 800,
        maxTitle: 100,
        supportsTags: false,
        supportsLinks: false,
        supportsTitles: true,
        supportsAutoMusic: false,
    },
    linkedin: {
        icon: LinkedinIcon,
        badgeColor: 'bg-[#0072B1]',
        maxCaption: 800,
        maxTitle: 100,
        supportsTags: false,
        supportsLinks: false,
        supportsTitles: true,
        supportsAutoMusic: false,
    },
}

// Utility functions for platform capabilities
export const getPlatformConfig = (platform: AccountPlatform): PlatformConfig => {
    return accountsPlatformConfig[platform]
}

export const supportsTags = (platform: AccountPlatform): boolean => {
    return accountsPlatformConfig[platform].supportsTags
}

export const supportsLinks = (platform: AccountPlatform): boolean => {
    return accountsPlatformConfig[platform].supportsLinks
}

export const supportsTitles = (platform: AccountPlatform): boolean => {
    return accountsPlatformConfig[platform].supportsTitles
}

export const supportsAutoMusic = (platform: AccountPlatform): boolean => {
    return accountsPlatformConfig[platform].supportsAutoMusic
}

export const shouldIncludeTags = (platform: AccountPlatform, tags: string[]): boolean => {
    return tags.length > 0 && supportsTags(platform)
}

export const shouldIncludeLinks = (platform: AccountPlatform, links: string[]): boolean => {
    return links.length > 0 && supportsLinks(platform)
}

export const shouldIncludeTitle = (platform: AccountPlatform): boolean => {
    return supportsTitles(platform)
}

export const shouldIncludeAutoMusic = (platform: AccountPlatform): boolean => {
    return supportsAutoMusic(platform)
}
