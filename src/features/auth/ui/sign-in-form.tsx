'use client'

import React, { JSX, useState } from 'react'

import { AxiosError } from 'axios'
import { Loader2, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import api from '@/shared/api/axios'
import { rememberTokenExpiry } from '@/shared/lib/auth/session'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

const SignInForm = ({ thirdPartyAuth }: { thirdPartyAuth: JSX.Element }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSignIn = async () => {
        if (!email || !password) {
            toast.error('Email and password are required.')
            return
        }

        try {
            setIsLoading(true)

            const res = await api.post('/auth/signin', {
                email,
                password,
                provider: 'credentials',
            })

            if (!res.data.user) {
                toast.error('User not found!')
            } else {
                toast.success('Signed in successfully!')
                rememberTokenExpiry()
                router.push(res.data.redirectUrl || '/all-posts')
            }

            return res
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                toast.error(err.response.data.message)
            } else {
                toast.error('Something went wrong.')
            }
            console.error('Sign-in error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                handleSignIn()
            }}
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            required
                            disabled={isLoading}
                            id="email"
                            name="email"
                            placeholder="m@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            required
                            disabled={isLoading}
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <Link className="text-xs text-primary underline" href="/forgot-password">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <Button className="w-full" disabled={isLoading} type="submit">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing In...
                            </>
                        ) : (
                            <>
                                <LogIn className="mr-2 h-4 w-4" />
                                Login
                            </>
                        )}
                    </Button>
                </div>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-primary">Or</span>
                </div>
                <div>{thirdPartyAuth}</div>
            </div>
        </form>
    )
}

export default SignInForm
