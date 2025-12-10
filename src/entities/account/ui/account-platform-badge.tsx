import React from 'react'

import { Badge } from '@/shared/ui/badge'

import { accountsPlatformConfig } from '../const/account-platform-config'
import { AccountPlatform } from '../model/account.interface'

const AccountPlatformBadge = ({ platform }: { platform: AccountPlatform }) => {
    return (
        <Badge
            className={`mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border-0 ${accountsPlatformConfig[platform].badgeColor} hover:opacity-90 transition-colors`}
        >
            {React.isValidElement(accountsPlatformConfig[platform].icon) ? (
                <span className="h-3.5 w-3.5 text-white flex items-center justify-center">
                    {accountsPlatformConfig[platform].icon}
                </span>
            ) : (
                React.createElement(
                    accountsPlatformConfig[platform].icon as React.ComponentType<{
                        className?: string
                    }>,
                    {
                        className: 'h-3.5 w-3.5 text-white',
                    }
                )
            )}
            <span className="text-xs font-medium capitalize text-white">
                {platform === AccountPlatform.x ? 'Twitter' : platform}
            </span>
        </Badge>
    )
}

export default AccountPlatformBadge
