import { ReactElement } from 'react'
import { Check, Clock, Pen, RefreshCcw } from 'lucide-react'

import { PostStatus } from '@/entities/post'

type SaveButtonConfig = { title: string; disable: boolean; icon?: ReactElement }

export const buttonConfigBasedOnStatus: Record<string, SaveButtonConfig> = {
    [PostStatus.FAILED]: {
        title: 'Try one more time!',
        icon: <RefreshCcw className="w-4 h-4" />,
        disable: false,
    },
    [PostStatus.DONE]: {
        title: 'Already Published',
        disable: true,
        icon: <Check className="w-4 h-4" />,
    },
    [PostStatus.DRAFT]: {
        title: 'Use Draft',
        icon: <Clock className="w-4 h-4" />,
        disable: false,
    },
    [PostStatus.PARTIALLY_DONE]: {
        title: 'Published To Some Accounts',
        disable: true,
        icon: <Check className="w-4 h-4" />,
    },
    [PostStatus.PENDING]: {
        title: 'Edit Post',
        disable: false,
        icon: <Pen className="w-4 h-4" />,
    },
    [PostStatus.POSTING]: {
        title: 'Posting...',
        disable: true,
        icon: <RefreshCcw className="w-4 h-4 animate-spin" />,
    },
}
