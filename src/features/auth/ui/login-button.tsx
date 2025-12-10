import axios from 'axios'
import { LogIn } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

import api from '@/shared/api/axios'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'

const fetchUser = async () => {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')

        if (!token) {
            return null
        }

        const { data } = await api.get('/user/user-info', {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        })

        return data.user
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            return null
        }

        console.error('Failed to fetch user info for LoginButton:', error)
        return null
    }
}

export const LoginButton = async () => {
    const renderLoginButton = () => (
        <Button
            asChild
            className="flex sm:h-10 items-center gap-2 shadow-lg hover:shadow-xl"
            variant={'outline'}
            size="icon"
        >
            <Link aria-label="Open authentication page" href="/auth">
                <LogIn className="size-4" />
                {/* <span aria-hidden="true" className="hidden sm:block">
                    Log In
                </span> */}
            </Link>
        </Button>
    )

    const user = await fetchUser()

    if (!user) {
        return renderLoginButton()
    }

    return (
        <Button
            className="relative size-10 rounded-full p-0 hover:bg-slate-100 transition-all duration-300"
            variant="ghost"
        >
            <Avatar className="size-10 border-2 primary shadow-md">
                <Link className="size-full" href={'/all-posts'}>
                    <AvatarImage alt="User Avatar" src={user.avatar || ''} />
                    <AvatarFallback className="bg-primary text-white">
                        {user.name ? user.name.substring(0, 2).toUpperCase() : 'CN'}
                    </AvatarFallback>
                </Link>
            </Avatar>
            <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 border-2 border-white"></span>
        </Button>
    )
}
