import { AccountPlatform } from '@/entities/account'

export type ScheduledDate = {
    date: Date
    time: string
}

interface BasePost {
    account: string
    platform: AccountPlatform
    text: string
    scheduledDate?: ScheduledDate
    mainCaption?: string
    threadsReplies?: string[]
    pinterestBoardId?: string // Optional for Pinterest posts
    tags?: string[] // Optional tags for all posts
    links?: string[] // Optional links for all posts
    isAutoMusicEnabled?: boolean // Optional for TikTok posts
    instagramFacebookPageId?: string // Optional for Instagram posts
}

export interface MediaPost extends BasePost {
    title?: string // Optional for Facebook media posts
}

export interface TextPost extends BasePost {
    title?: string // Optional for Facebook text posts
}

export type PostFormSchema = MediaPost | TextPost
