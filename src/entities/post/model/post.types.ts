import { AccountPlatform } from '@/entities/account'

export enum PostType {
    'media' = 'media',
    'text' = 'text',
}

export enum MediaType {
    'VIDEO' = 'video',
    'IMAGE' = 'image',
}

export enum PostStatus {
    'PENDING' = 'PENDING',
    'DRAFT' = 'DRAFT',
    'DONE' = 'DONE',
    'FAILED' = 'FAILED',
    'POSTING' = 'POSTING',
    'PARTIALLY_DONE' = 'PARTIALLY_DONE',
}

export interface ScheduledDate {
    date: Date
    time: string // Format: "HH:mm"
    timezone?: string
}

//FORM TYPES
export interface BasePost {
    account: string
    platform: AccountPlatform
    text: string
    scheduledDate: ScheduledDate
    mainCaption: string
    threadsReplies?: string[]
    pinterestBoardId?: string
    tags?: string[]
    links?: string[]
    isAutoMusicEnabled?: boolean
    instagramFacebookPageId?: string
}

export interface TextPost extends BasePost {
    title?: string
}

export interface MediaPost extends BasePost {
    media?: File
}

export type PostFormSchema = TextPost | MediaPost

// REQUESTS

export type PostTarget = {
    platform: AccountPlatform
    status: PostStatus
    socialAccountId: string
    text: string
    title?: string
    pinterestBoardId?: string
    tags?: string[]
    links?: string[]
    isAutoMusicEnabled?: boolean
    instagramFacebookPageId?: string
    errorMessage?: string
    postId: string
}

export type Media = {
    url: string
    type: string
    order: number
}
export interface IPost {
    postId: string
    type: PostType
    status: PostStatus
    scheduledTime: string
    createdAt: string
    mainCaption?: string
    targets: PostTarget[]
    media: Media[]
}

export interface IPostFilters {
    platform?: AccountPlatform
    status?: PostStatus
    fromDate?: string
    toDate?: string
    page?: string
}

export interface IPostService {
    sendPosts(
        posts: any[], // Use any to avoid circular dependency, will be PostFormSchema from post-form-schema.ts
        postType: PostType,
        shouldSchedule: boolean,
        scheduleTime: ScheduledDate,
        media?: File[] | null,
        mainCaption?: string | null,
        status?: PostStatus,
        coverTimestamp?: number,
        coverImage?: File,
        copyDataUrls?: string[] | undefined,
        postNow?: boolean
    ): Promise<void>

    editPost(
        postId: string,
        posts: any[], // Use any to avoid circular dependency, will be PostFormSchema from post-form-schema.ts
        postType: PostType,
        shouldSchedule: boolean,
        scheduleTime: ScheduledDate,
        media?: File[],
        mainCaption?: string,
        coverTimestamp?: number,
        coverImage?: File
    ): Promise<void>

    retryPostTarget(postId: string, socialAccountId: string): Promise<void>

    deletePostById(postId: string): Promise<void>

    getPostsByDate(fromDate: Date, toDate: Date): Promise<{ posts: IPost[] }>
}
