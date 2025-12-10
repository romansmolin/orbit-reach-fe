'use client'

import React, { useEffect } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useRtkPostService } from '@/entities/post'
import { Button } from '@/shared/ui/button'

const DeletePostButton = ({ postId }: { postId: string }) => {
    const router = useRouter()
    const { deletePostById, deleteStatus } = useRtkPostService()

    useEffect(() => {
        if (deleteStatus.isSuccess) {
            toast.success('Post deleted successfully!')
            router.refresh()
        }
        if (deleteStatus.isError) toast.error('Post is not deleted! Somehing went wrong!')
    }, [deleteStatus.isError, deleteStatus.isSuccess])

    return (
        <Button
            className="flex gap-2 flex-1"
            disabled={deleteStatus.isLoading}
            size="lg"
            variant="destructive"
            onClick={() => deletePostById(postId)}
        >
            {deleteStatus.isLoading ? (
                <>
                    <Loader2 className="animate-spin" />
                    Deleting...
                </>
            ) : (
                <>
                    <Trash2 />
                    Delete
                </>
            )}
        </Button>
    )
}

export default DeletePostButton
