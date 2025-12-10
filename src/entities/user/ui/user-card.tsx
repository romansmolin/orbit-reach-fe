'use client'

import { ReactNode } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { LogOut, Settings2 } from 'lucide-react'
import Link from 'next/link'

import { GenericCard } from '@/shared/components/generic-card'
import { GenericDropdown } from '@/shared/components/generic-dropdown'
import { If } from '@/shared/components/if'
import { Button } from '@/shared/ui/button'
import { useSidebar } from '@/shared/ui/sidebar'
import { Skeleton } from '@/shared/ui/skeleton'

import { useGetUserInfoQuery } from '../api/client/user.api'

import { UserLimitsCard } from './user-limits-card'

type DropdownItem = {
    key: string
    label?: string
    icon?: ReactNode
    href: string
    type?: 'item' | 'separator'
}

const dropdownItemsCollapsed: DropdownItem[] = [
    { key: 'logout', label: 'Log out', icon: <LogOut />, href: '/log-out' },
    {
        key: 'settings',
        label: 'Settings',
        icon: <Settings2 />,
        href: '/settings',
    },
]

const dropdownItemsExpanded: DropdownItem[] = [
    { key: 'logout', label: 'Log out', icon: <LogOut />, href: '/log-out' },
    {
        key: 'settings',
        label: 'Settings',
        icon: <Settings2 />,
        href: '/settings',
    },
]

const UserCard = ({ upgradePlanButton }: { upgradePlanButton?: ReactNode }) => {
    const { state } = useSidebar()
    const { data: userInfo, isLoading } = useGetUserInfoQuery()

    const quotaUsage = userInfo?.quotaUsage

    const userCardContent = (
        <>
            <div className="flex items-center gap-4">
                {isLoading && (
                    <Skeleton className="h-12 w-12 border-2 border-primary/20 shadow-md rounded-full flex-shrink-0" />
                )}
                {!isLoading && (
                    <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-md rounded-full flex-shrink-0">
                        <AvatarImage
                            alt={userInfo?.user.name || 'User avatar'}
                            className="rounded-full"
                            src={userInfo?.user.avatar || ''}
                        />

                        <AvatarFallback className="flex rounded-full bg-primary items-center justify-center text-white size-full">
                            {userInfo?.user.name[0]}
                        </AvatarFallback>
                    </Avatar>
                )}

                {isLoading ? (
                    <>
                        <div className="flex flex-col gap-2  overflow-hidden w-full">
                            <Skeleton className="w-full h-3" />
                            <Skeleton className="w-full h-3" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col  overflow-hidden">
                            <p className="text-lg font-semibold truncate">{userInfo?.user.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{userInfo?.user.email}</p>
                        </div>
                    </>
                )}
            </div>
        </>
    )

    const userCardFooter = (
        <If
            children={upgradePlanButton}
            condition={userInfo?.plan.planName !== 'PRO'}
            fallback={
                <div className="w-full">
                    <Button className="w-full bg-primary text-white" size="sm" variant="outline">
                        <Settings2 className="mr-2 size-4" />
                        Go To Settings
                    </Button>
                </div>
            }
        />
    )

    if (state === 'collapsed') {
        return (
            <GenericDropdown<DropdownItem>
                withSeparator
                contentClassName="w-56"
                items={dropdownItemsCollapsed}
                label={
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium truncate">{userInfo?.user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{userInfo?.user.email}</p>
                    </div>
                }
                renderItem={(item) => (
                    <div className="flex items-center gap-2">
                        {item.icon}
                        {item.label}
                    </div>
                )}
                trigger={
                    <div className="flex justify-center cursor-pointer">
                        {isLoading && <Skeleton className="h-12 w-12  rounded-full" />}
                        {!isLoading && (
                            <Avatar className="border-2 border-primary/20 shadow-md rounded-full hover:border-primary/50 transition-colors duration-200">
                                <AvatarImage
                                    alt={userInfo?.user.name || 'User avatar'}
                                    className="rounded-full"
                                    src={userInfo?.user.avatar || ''}
                                />
                                <AvatarFallback className="bg-primary/10 text-primary">ttt</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                }
            />
        )
    }

    return (
        <div className="flex flex-col gap-3">
            {userInfo && quotaUsage && !isLoading && <UserLimitsCard isLoading={false} quotaUsage={quotaUsage} />}

            <GenericDropdown<DropdownItem>
                withSeparator
                contentClassName="w-56"
                items={dropdownItemsExpanded}
                label="My Account"
                renderItem={(item) => (
                    <Link className="flex items-center gap-2" href={item.href}>
                        {item.icon}
                        {item.label}
                    </Link>
                )}
                trigger={
                    <GenericCard
                        cardContainerClassName="flex flex-col gap-3 p-4 bg-background text-card-foreground cursor-pointer hover:border-primary/40 transition-colors duration-200"
                        cardContent={userCardContent}
                        cardFooter={userCardFooter}
                    />
                }
            />
        </div>
    )
}

export default UserCard
