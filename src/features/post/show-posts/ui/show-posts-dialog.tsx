import React, { ReactNode } from 'react'

import { IPost, PostMinimalisticCards } from '@/entities/post'
import { GenericDialog } from '@/shared/components'

import EditPostWrapper from '../../edit-post/ui/edit-post-wrapper'

interface ShowPostsDialogProps {
    posts: IPost[]
    triggerButton: ReactNode
    dialogHeaderTitle: string
}

const ShowPostsDialog = ({ posts, triggerButton, dialogHeaderTitle }: ShowPostsDialogProps) => {
    return (
        <GenericDialog
            dialogHeaderDescription="Check all post that shcedule for this day!"
            dialogHeaderTitle={dialogHeaderTitle}
            dialogTriggerComp={triggerButton}
            dialogContent={
                <div className="flex flex-col gap-2 w-full">
                    {posts.map((post) => (
                        <EditPostWrapper key={post.postId} post={post}>
                            <PostMinimalisticCards post={post} />
                        </EditPostWrapper>
                    ))}
                </div>
            }
        />
    )
}

export default ShowPostsDialog
