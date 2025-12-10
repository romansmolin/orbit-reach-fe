import { AiToneId } from '../model/ai.types'

export interface AiToneOption {
    id: AiToneId
    label: string
}

export const aiToneOptions: AiToneOption[] = [
    {
        id: 'friendly',
        label: 'Friendly',
    },
    {
        id: 'professional',
        label: 'Professional',
    },
    {
        id: 'informative',
        label: 'Informative',
    },
    {
        id: 'humorous',
        label: 'Humorous',
    },
    {
        id: 'inspirational',
        label: 'Inspirational',
    },
    {
        id: 'empathetic',
        label: 'Empathetic',
    },
    {
        id: 'authoritative',
        label: 'Authoritative',
    },
    {
        id: 'playful',
        label: 'Playful',
    },
    {
        id: 'educational',
        label: 'Educational',
    },
    {
        id: 'urgent',
        label: 'Urgent',
    },
]
