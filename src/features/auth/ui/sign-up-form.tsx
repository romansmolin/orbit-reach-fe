'use client'

import React, { JSX, useState } from 'react'

import { AxiosError } from 'axios'
import { Loader2, LogIn } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import api from '@/shared/api/axios'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

const SignUpForm = ({ thirdPartyAuth }: { thirdPartyAuth: JSX.Element }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const searchParams = useSearchParams()

    const handleSignUp = async () => {
        const magicToken = searchParams.get('magicToken')

        if (!name || !email || !password) {
            toast.error('All fields are required.')
            return
        }

        try {
            setIsLoading(true)

            const signUpRes = await api.post('/auth/signup', {
                name,
                email,
                password,
                provider: 'credentials',
                ...(magicToken && { magicToken }),
            })

            toast.success('Signed up successfully!')
            return signUpRes
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                toast.error(err.response.data.message)
            } else {
                toast.error('Something went wrong.')
            }
            console.error('Credentials authentication failed:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            required
                            id="name"
                            name="name"
                            type="string"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            required
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
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button className="w-full" disabled={isLoading} type="submit" onClick={handleSignUp}>
                        {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
                        Sign Up
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

export default SignUpForm
