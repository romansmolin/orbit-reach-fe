import React, { ReactElement } from 'react'

import { Alert, AlertTitle } from '@/shared/ui/alert'

import { alertConfigBasedOnStatus } from '../const/edit-post-alert-config'
import { PostTarget } from '../model/post.types'

interface PostTargetAlertProps {
    failedPost: PostTarget
    alertButton?: ReactElement
}

const PostTargetAlert: React.FC<PostTargetAlertProps> = ({ failedPost, alertButton }) => {
    const config = alertConfigBasedOnStatus[failedPost.platform]
    if (!config) return null

    return (
        <Alert className={`${config.color} flex items-center justify-between `} variant="destructive">
            <AlertTitle className="flex items-center gap-2">
                <div className={`p-2 rounded-full text-white`}>{config.icon}</div>
                <span className="flex flex-col gap-1">
                    <p className="text-bold text-md">
                        {config.title} {failedPost.socialAccountId}
                    </p>
                    {failedPost.errorMessage && (
                        <p className="text-[0.8rem]">{failedPost.errorMessage}</p>
                    )}
                </span>
            </AlertTitle>
            {alertButton && alertButton}
        </Alert>
    )
}

export default PostTargetAlert
