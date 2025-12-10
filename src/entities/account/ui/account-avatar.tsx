'use client'

import React from 'react'

import { cn } from '@/shared/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'

import { accountsPlatformConfig } from '../const/account-platform-config'
import { AccountPlatform } from '../model/account.interface'

interface AccountAvatarProps {
    picture?: string | null
    username: string
    platform: AccountPlatform
    isSelected?: boolean
    onClick?: () => void
    className?: string
    disabled?: boolean
    disableMessage?: string
    isError?: boolean
}

export const AccountAvatar: React.FC<AccountAvatarProps> = ({
    picture,
    username,
    platform,
    isSelected = false,
    isError = false,
    onClick,
    className,
    disabled = false,
    disableMessage,
}) => {
    return (
        <Tooltip>
            <TooltipTrigger>
                <div
                    className={cn(
                        'relative group size-11 transition-all duration-200 rounded-full',
                        isError
                            ? 'border-red-500 ring-2 ring-red-500'
                            : isSelected
                              ? 'border-green-500 ring-2 ring-green-200'
                              : 'border-gray-200 group-hover:border-gray-300 opacity-60 group-hover:opacity-80',
                        disabled && 'opacity-30 cursor-not-allowed grayscale',
                        !disabled && onClick && 'cursor-pointer',
                        className
                    )}
                    onClick={disabled ? () => {} : onClick}
                >
                    <Avatar className="size-11 border-2">
                        <AvatarImage
                            alt={username}
                            className="object-cover"
                            src={picture || '/placeholder.svg'}
                        />
                        <AvatarFallback className={accountsPlatformConfig[platform].badgeColor}>
                            <span className="text-white font-semibold text-sm">
                                {username.substring(0, 2).toUpperCase()}
                            </span>
                        </AvatarFallback>
                    </Avatar>
                    <div
                        className={cn(
                            'absolute rounded-full size-6 border-primary border flex justify-center items-center right-6 -bottom-2',
                            accountsPlatformConfig[platform].badgeColor
                        )}
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
                                { className: 'h-3.5 w-3.5 text-white' }
                            )
                        )}
                    </div>
                </div>
            </TooltipTrigger>
            {disabled && (
                <TooltipContent>
                    {disableMessage ||
                        'Sorry you cannot select this social account, please check instructions!'}
                </TooltipContent>
            )}
        </Tooltip>
    )
}
