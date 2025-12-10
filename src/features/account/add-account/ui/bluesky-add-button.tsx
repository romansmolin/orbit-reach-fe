'use client'

import { Loader } from 'lucide-react'
import Link from 'next/link'

import BlueskyIcon from '@/shared/icon/bluesky-icon'
import { GenericDialog } from '@/shared/components'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

import useConnectBluesky from '../hooks/use-connect-bluesky'

export function BlueskyAddButton() {
    const { username, password, setPassword, setUsername, connectBlueskyAccount, isLoading } =
        useConnectBluesky()
    return (
        <GenericDialog
            className="sm:max-w-md"
            dialogHeaderDescription="You need a Bluesky handle to connect your account. Please note that Bluesky is still evolving as a platform, so some connectivity features may be limited."
            dialogHeaderTitle="Connect Bluesky Account"
            dialogContent={
                <div className="flex flex-col pt-4 gap-3 w-full">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor={`username`}>Username</Label>
                        <Input
                            required
                            disabled={false}
                            id="username"
                            name="username"
                            placeholder="sername.bsky.social or username.domain.com"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Label htmlFor={`password`}>Password</Label>
                        <Input
                            required
                            disabled={false}
                            id="password"
                            name="password"
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="text-sm text-muted-foreground">
                            Generate an App Password from your{' '}
                            <Link
                                className="text-primary italic underline"
                                href={'https://bsky.app/settings/app-passwords'}
                            >
                                Bluesky Settings
                            </Link>{' '}
                            This is not your account password.
                        </div>
                    </div>

                    <div className="pt-4 w-full">
                        <Button
                            className="bg-[#0a7aff] hover:bg-[#0a7aff] w-full"
                            disabled={!password || !username}
                            size="lg"
                            onClick={() => connectBlueskyAccount()}
                        >
                            {isLoading ? (
                                <>
                                    <Loader className="animate-spin" />
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    <BlueskyIcon />
                                    Connect Bluesky
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            }
            dialogTriggerComp={
                <Button className="bg-[#0a7aff] hover:bg-[#0a7aff] w-full" size="lg">
                    <BlueskyIcon />
                    Connect Bluesky
                </Button>
            }
        />
    )
}
