'use client'

import { AccountPlatform } from '@/entities/account'
import { GenericDialog } from '@/shared/components'
import FacebookIcon from '@/shared/icon/facebook-icon'
import { Button } from '@/shared/ui/button'

import { handleConnect } from '../utils/connect-handler'

export function FacebookAddButton() {
    const handleConnectClick = () => handleConnect(AccountPlatform.facebook)

    return (
        <GenericDialog
            className="sm:max-w-md"
            dialogHeaderDescription="You must connect a Facebook Page, not a personal profile. Make sure you have admin access to the Facebook Page you want to connect."
            dialogHeaderTitle="Connect Facebook Account"
            dialogContent={
                <Button
                    className="bg-[#0866ff] hover:bg-[#0866ff] w-full"
                    size="lg"
                    onClick={handleConnectClick}
                >
                    <FacebookIcon />
                    Connect Facebook
                </Button>
            }
            dialogTriggerComp={
                <Button className="bg-[#0866ff] hover:bg-[#0866ff] w-full" size="lg">
                    <FacebookIcon />
                    Connect Facebook
                </Button>
            }
        />
    )
}
