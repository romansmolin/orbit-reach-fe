'use client'

import React, { useState } from 'react'

import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { AccountPlatform, useDeleteAccountMutation } from '@/entities/account'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/shared/ui/alert-dialog'
import { Button } from '@/shared/ui/button'

interface DeleteAccountButtonProps {
    provider: AccountPlatform
    accountId: string
}

export const DeleteAccountButton = ({ provider, accountId }: DeleteAccountButtonProps) => {
    const [deleteAccount, { isLoading }] = useDeleteAccountMutation()
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount({ accountId }).unwrap()
            toast.success('Account has been deleted!')
            router.refresh()
        } catch (err: unknown) {
            console.error('Error while deleting an account: ', err)
            toast.error('Failed to delete account!')
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button className="flex-1 h-9 " disabled={isLoading} size="lg" variant={'destructive'}>
                    <Trash2 className={`h-4 w-4 ${isLoading ? 'animate-pulse' : ''}`} />
                    {isLoading ? 'Deleting...' : 'Delete'}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete your {provider} account connection and{' '}
                        <span className="text-primary">
                            all scheduled posts, unless those posts are scheduled for another account.{' '}
                        </span>
                        . This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex gap-3">
                    <AlertDialogCancel className="flex-1 " disabled={isLoading}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600 flex-1"
                        disabled={isLoading}
                        onClick={handleDeleteAccount}
                    >
                        {isLoading ? 'Deleting...' : 'Delete Account'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
