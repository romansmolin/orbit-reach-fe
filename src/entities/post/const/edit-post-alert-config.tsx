import { ReactElement } from 'react'

import { AccountPlatform } from '@/entities/account'
import BlueskyIcon from '@/shared/icon/bluesky-icon'
import FacebookIcon from '@/shared/icon/facebook-icon'
import InstagramIcon from '@/shared/icon/instagram-icon'
import LinkedinIcon from '@/shared/icon/linkedin-icon'
import PinterestIcon from '@/shared/icon/pinterest-icon'
import ThreadsIcon from '@/shared/icon/threads-icon'
import TikTokIcon from '@/shared/icon/tik-tok-icon'
import YouTubeIcon from '@/shared/icon/youtube-icon'

type SaveButtonConfig = {
    title: string
    icon?: ReactElement
    color?: string
    borderColor?: string
}

export const alertConfigBasedOnStatus: Record<AccountPlatform, SaveButtonConfig> = {
    [AccountPlatform.facebook]: {
        title: 'Failed to post to Facebook account with ID:',
        icon: <FacebookIcon className="w-4 h-4" />,
        color: 'bg-[#0866ff]',
        borderColor: 'border-[#0866ff]',
    },
    [AccountPlatform.youtube]: {
        title: 'Failed to post to YouTube account with ID:',
        icon: <YouTubeIcon className="w-4 h-4" />,
        color: 'bg-[#FF0000]',
        borderColor: 'border-[#FF0000]',
    },
    [AccountPlatform.threads]: {
        title: 'Failed to post to Threads account with ID:',
        icon: <ThreadsIcon className="w-4 h-4" />,
        color: 'bg-black',
        borderColor: 'border-black',
    },
    [AccountPlatform.bluesky]: {
        title: 'Failed to post to Bluesky account with ID:',
        icon: <BlueskyIcon className="w-4 h-4" />,
        color: 'bg-[#0a7aff]',
        borderColor: 'border-[#0a7aff]',
    },
    [AccountPlatform.instagram]: {
        title: 'Failed to post to Instagram account with ID:',
        icon: <InstagramIcon className="w-4 h-4" />,
        color: 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
        borderColor: 'border-[#833ab4]',
    },
    [AccountPlatform.pinterest]: {
        title: 'Failed to post to Pinterest account with ID:',
        icon: <PinterestIcon className="w-4 h-4" />,
        color: 'bg-[#E60023]',
        borderColor: 'border-[#E60023]',
    },
    [AccountPlatform.tiktok]: {
        title: 'Failed to post to TikTok account with ID:',
        icon: <TikTokIcon className="w-4 h-4" />,
        color: 'bg-black',
        borderColor: 'border-black',
    },
    [AccountPlatform.linkedin]: {
        title: 'Failed to post to LinkedIn account with ID:',
        icon: <LinkedinIcon className="w-4 h-4" />,
        color: 'bg-[#0a66c2]',
        borderColor: 'border-[#0a66c2]',
    },
    [AccountPlatform.x]: {
        title: 'Failed to post to X account with ID:',
        icon: undefined,
        color: 'bg-black',
        borderColor: 'border-black',
    },
}
