'use client'

import { AccountPlatform } from '@/entities/account'
import { GenericDialog } from '@/shared/components'
import LinkedinIcon from '@/shared/icon/linkedin-icon'
import { Button } from '@/shared/ui/button'

import { handleConnect } from '../utils/connect-handler'

export function LinkedinAddButton() {
    const handleConnectClick = () => handleConnect(AccountPlatform.linkedin)

    return (
        <GenericDialog
            className="sm:max-w-md"
            dialogHeaderDescription="You need a personal LinkedIn profile to connect. Some features like posting may only work for profiles that are actively maintained and not restricted. Make sure your profile is up to date."
            dialogHeaderTitle="Connect LinkedIn Account"
            dialogContent={
                <Button
                    className="bg-[#0a66c2] hover:bg-[#0a66c2] w-full"
                    size="lg"
                    onClick={handleConnectClick}
                >
                    <LinkedinIcon />
                    Connect LinkedIn
                </Button>
            }
            dialogTriggerComp={
                <Button className="bg-[#0a66c2] hover:bg-[#0a66c2] w-full" size="lg">
                    <LinkedinIcon />
                    Connect LinkedIn
                </Button>
            }
        />
    )
}
