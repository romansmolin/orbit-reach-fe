'use client'

import { AccountPlatform } from '@/entities/account'
import { GenericDialog } from '@/shared/components'
import InstagramIcon from '@/shared/icon/instagram-icon'
import { Button } from '@/shared/ui/button'

import { handleConnect } from '../utils/connect-handler'

export function InstagramAddButton() {
    const handleConnectClick = () => handleConnect(AccountPlatform.instagram)

    return (
        <GenericDialog
            className="sm:max-w-md"
            dialogHeaderDescription="Only Business or Creator Instagram accounts are supported. Your Instagram account must be linked to a Facebook Page to enable all features."
            dialogHeaderTitle="Connect Instagram Account"
            dialogContent={
                <Button
                    className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] w-full"
                    size="lg"
                    onClick={handleConnectClick}
                >
                    <InstagramIcon />
                    Connect Instagram
                </Button>
            }
            dialogTriggerComp={
                <Button className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] w-full" size="lg">
                    <InstagramIcon />
                    Connect Instagram
                </Button>
            }
        />
    )
}
