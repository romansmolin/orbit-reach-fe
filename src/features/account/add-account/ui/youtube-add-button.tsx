'use client'

import { AccountPlatform } from '@/entities/account'
import { GenericDialog } from '@/shared/components'
import YouTubeIcon from '@/shared/icon/youtube-icon'
import { Button } from '@/shared/ui/button'

import { handleConnect } from '../utils/connect-handler'

export function YoutubeAddButton() {
    const handleConnectClick = () => handleConnect(AccountPlatform.youtube)

    return (
        <GenericDialog
            className="sm:max-w-md"
            dialogHeaderDescription="You need a verified YouTube account to connect. You may need to grant posting permissions during the connection process for full functionality."
            dialogHeaderTitle="Connect YouTube Account"
            dialogContent={
                <Button
                    className="bg-[#FF0000] hover:bg-[#FF0000] w-full"
                    size="lg"
                    onClick={handleConnectClick}
                >
                    <YouTubeIcon />
                    Connect YouTube
                </Button>
            }
            dialogTriggerComp={
                <Button className="bg-[#FF0000] hover:bg-[#FF0000] w-full" size="lg">
                    <YouTubeIcon />
                    Connect YouTube
                </Button>
            }
        />
    )
}
