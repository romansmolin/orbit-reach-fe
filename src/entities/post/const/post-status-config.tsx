import { Bolt, CheckCheck, Clock, FileEdit, FileWarning, RefreshCcw } from 'lucide-react'

import { PostStatus } from '../model/post.types'

interface PostStatusConfig {
    label: string
    toneClass: string
    Icon: React.ComponentType<{ className?: string }>
}

export const postStatusConfig: Record<PostStatus, PostStatusConfig> = {
    [PostStatus.DRAFT]: {
        label: 'Draft',
        toneClass: 'text-slate-500',
        Icon: FileEdit,
    },
    [PostStatus.PENDING]: {
        label: 'Pending',
        toneClass: 'text-amber-500',
        Icon: Clock,
    },
    [PostStatus.DONE]: {
        label: 'Published',
        toneClass: 'text-emerald-500',
        Icon: CheckCheck,
    },
    [PostStatus.FAILED]: {
        label: 'Failed',
        toneClass: 'text-red-500',
        Icon: FileWarning,
    },
    [PostStatus.POSTING]: {
        label: 'Posting',
        toneClass: 'text-blue-500',
        Icon: RefreshCcw,
    },
    [PostStatus.PARTIALLY_DONE]: {
        label: 'Partially',
        toneClass: 'text-amber-500',
        Icon: Bolt,
    },
}
