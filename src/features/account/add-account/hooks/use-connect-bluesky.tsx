'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useConnectBlusekyAccountMutation } from '@/entities/account'

const useConnectBluesky = () => {
    const [connectBlueskyAcc, { isLoading, isSuccess }] = useConnectBlusekyAccountMutation()
    const router = useRouter()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        if (isSuccess) {
            toast.success('Bluesky account connected successfully!')
            router.refresh()
        }
    }, [isSuccess])

    const connectBlueskyAccount = useCallback(() => {
        if (!password || !username) toast.error('Username and password required!')
        connectBlueskyAcc({ username, password }).unwrap()
        router.refresh()
    }, [username, password, connectBlueskyAcc])

    return {
        setUsername,
        setPassword,
        username,
        password,
        connectBlueskyAccount,
        isLoading,
    }
}

export default useConnectBluesky
