export interface Account {
    id: string
    username: string
    connectedAt: string
    picture: string
    platform: AccountPlatform
}

export interface PinterestAccountBoard {
    id: string
    tenantId: string
    socialAccountId: string
    pinterestBoardId: string
    name: string
    description: string | null
    ownerUsername: string | null
    thumbnailUrl: string | null
    privacy: 'PUBLIC' | 'PROTECTED' | 'SECRET'
    createdAt: Date
    updatedAt: Date
}

export enum AccountPlatform {
    instagram = 'instagram',
    facebook = 'facebook',
    tiktok = 'tiktok',
    x = 'x',
    threads = 'threads',
    youtube = 'youtube',
    bluesky = 'bluesky',
    pinterest = 'pinterest',
    linkedin = 'linkedin',
}
