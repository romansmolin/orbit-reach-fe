import { useCallback } from 'react'

import { notifySuccess } from '@/shared/lib/notifications'

import { CoverData } from './types'

type SetCoverData = (cover: CoverData) => void

export const useCoverDataHandler = (setCoverData: SetCoverData) => {
    return useCallback(
        (coverData: CoverData) => {
            setCoverData(coverData)

            if (coverData.image) {
                notifySuccess('Cover image uploaded successfully!')
            }

            if (coverData.timestamp) {
                notifySuccess(`Cover timestamp set to ${coverData.timestamp.toFixed(1)}s!`)
            }
        },
        [setCoverData]
    )
}
