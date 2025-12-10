import { useEffect } from 'react'

import { notifyError, notifySuccess } from '@/shared/lib/notifications'

interface PostNotificationsParams {
    isSuccess: boolean
    isError: boolean
}

export const usePostNotifications = ({ isSuccess, isError }: PostNotificationsParams) => {
    useEffect(() => {
        if (isSuccess) {
            notifySuccess('Post created successfully!')
        }

        if (isError) {
            notifyError('Post is not created! Something went wrong!')
        }
    }, [isError, isSuccess])
}
