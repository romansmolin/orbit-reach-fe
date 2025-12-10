'use client'

import { AccountPlatform } from '@/entities/account'
import { GenericDialog } from '@/shared/components'
import ThreadsIcon from '@/shared/icon/threads-icon'
import { Button } from '@/shared/ui/button'

import { handleConnect } from '../utils/connect-handler'

export function ThreadsAddButton() {
    const handleThreadsConnect = () => handleConnect(AccountPlatform.threads)

    return (
        <GenericDialog
            className="sm:max-w-md"
            dialogHeaderDescription="Threads is connected through Instagram. You must connect your Instagram account first before you can use Threads functionality."
            dialogHeaderTitle="Connect Threads Account"
            dialogContent={
                <Button className="bg-black hover:bg-black w-full" size="lg" onClick={handleThreadsConnect}>
                    <ThreadsIcon />
                    Connect Threads
                </Button>
            }
            dialogTriggerComp={
                <Button className="bg-black hover:bg-black w-full" size="lg">
                    <ThreadsIcon />
                    Connect Threads
                </Button>
            }
        />
    )
}
