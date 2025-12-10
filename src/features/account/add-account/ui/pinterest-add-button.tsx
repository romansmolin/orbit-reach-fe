'use client'

import { AccountPlatform } from '@/entities/account'
import { GenericDialog } from '@/shared/components'
import PinterestIcon from '@/shared/icon/pinterest-icon'
import { Button } from '@/shared/ui/button'

import { handleConnect } from '../utils/connect-handler'

export function PinterestAddButton() {
    const handleConnectClick = () => handleConnect(AccountPlatform.pinterest)

    return (
        <GenericDialog
            className="sm:max-w-md"
            dialogHeaderDescription="A Pinterest Business account is required to connect to our platform. If you have a personal account, please convert it to a business account in your Pinterest settings."
            dialogHeaderTitle="Connect Pinterest Account"
            dialogContent={
                <Button
                    className="bg-[#E60023] hover:bg-[#E60023] w-full"
                    size="lg"
                    onClick={handleConnectClick}
                >
                    <PinterestIcon />
                    Connect Pinterest
                </Button>
            }
            dialogTriggerComp={
                <Button className="bg-[#E60023] hover:bg-[#E60023] w-full" size="lg">
                    <PinterestIcon />
                    Connect Pinterest
                </Button>
            }
        />
    )
}
