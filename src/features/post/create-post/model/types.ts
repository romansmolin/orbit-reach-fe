import { Dispatch, ReactNode, SetStateAction } from 'react'

import { Account, AccountPlatform } from '@/entities/account'
import { PostFormSchema } from '@/entities/post'
import { MediaType, PostType, ScheduledDate } from '@/entities/post/model/post.types'

export interface CoverData {
    timestamp?: number
    image?: File
    imagePreviewUrl?: string
}

export interface CreatePostContextValue {
    media: File[] | undefined
    mediaType: MediaType
    previewUrls: string[]
    mainCaption: string
    selectedAccounts: Account[]
    postType: PostType
    scheduledPosts: PostFormSchema[]
    shouldSchedule: boolean
    isLoading: boolean
    isDraftLoading: boolean
    isCreateLoading: boolean
    isScheduleLoading: boolean
    scheduledTime: ScheduledDate
    coverData: CoverData
    currentTag: string
    accountTags: Record<string, string[]>
    currentLinks: Map<string, string>
    accountLinks: Record<string, string[]>
    tikTokAutoMusicEnabled: Record<string, boolean>

    setMedia: Dispatch<SetStateAction<File[] | undefined>>
    setMediaType: Dispatch<SetStateAction<MediaType>>
    setPreviewUrls: Dispatch<SetStateAction<string[]>>
    setMainCaption: (text: string) => void
    onAccountSelect: (account: Account) => void
    onFileSelect: (files: File[]) => void
    onPostTextChange: (
        text: string,
        accountId: string,
        platform?: AccountPlatform,
        title?: string,
        threadsReplies?: string[]
    ) => void
    onPinterestBoardSelect: (accountId: string, boardId: string) => void
    onPostDateTimeChange: (date: Date | null, time: string | null) => void
    setShouldSchedule: Dispatch<SetStateAction<boolean>>
    schedulePosts: () => Promise<void>
    draftPosts: () => Promise<void>
    publishPosts: () => Promise<void>
    resetForm: () => void
    setPostType: Dispatch<SetStateAction<PostType>>
    onCoverDataSelect: (coverData: CoverData) => void
    onEnableTikTokAutoMusic: (accountId: string, enable: boolean) => void
    setCurrentTag: Dispatch<SetStateAction<string>>
    addTagToAccount: (accountId: string, tag: string) => void
    removeTagFromAccount: (accountId: string, tagIndex: number) => void
    clearAccountTags: (accountId: string) => void
    getAccountTags: (accountId: string) => string[]
    getCurrentLink: (accountId: string) => string
    setCurrentLink: (accountId: string, link: string) => void
    addLinkToAccount: (accountId: string, tag: string) => void
    removeLinkFromAccount: (accountId: string, tagIndex: number) => void
    clearAccountLinks: (accountId: string) => void
    getAccountLinks: (accountId: string) => string[]
    updateScheduledPost: (
        accountId: string,
        updater: (post: PostFormSchema) => PostFormSchema
    ) => void
}

export interface CreatePostProviderProps {
    children: ReactNode
    copyData?: string
    initialTimezone?: string
    initialScheduledDate?: Date
}
