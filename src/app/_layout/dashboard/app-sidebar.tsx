'use client'

import React, { useEffect } from 'react'

import { Calendar, Frown, List, StickyNote, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { useGetFailedPostsCountQuery } from '@/entities/post'
import { UserCard } from '@/entities/user'
import { cn } from '@/shared/lib/utils'
import { Badge } from '@/shared/ui/badge'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    useSidebar,
} from '@/shared/ui/sidebar'

import Logo from '../basic/logo'

import { SimpleNavMenu } from './simple-nav-menu'

const AppSidebar = () => {
    const { state } = useSidebar()
    const isCollapsed = state === 'collapsed'
    const { data, refetch } = useGetFailedPostsCountQuery()
    const pathname = usePathname()

    useEffect(() => {
        if (pathname === '/failed') {
            refetch()
        }
    }, [pathname, refetch])

    const menuGroups = [
        {
            title: 'Content',
            items: [
                {
                    title: 'All Posts',
                    icon: List,
                    url: '/all-posts',
                },
                {
                    title: 'New Post',
                    icon: StickyNote,
                    url: '/new-post',
                },
                {
                    title: 'Calendar',
                    icon: Calendar,
                    url: '/calendar',
                },
                {
                    title: 'Failed',
                    icon: Frown,
                    url: '/failed',
                    ...(data?.failedCount && {
                        badge: <Badge variant={'destructive'}>{data?.failedCount}</Badge>,
                    }),
                },
            ],
        },
        {
            title: 'Configuration',
            items: [
                {
                    title: 'Social Accounts',
                    icon: Users,
                    url: '/accounts',
                },
            ],
        },
    ]

    return (
        <Sidebar className="!bg-transparent" collapsible="icon">
            <SidebarHeader className="">
                <div className="flex items-center gap-3 pt-2">
                    <Logo className="size-10 md:size-10" />

                    {!isCollapsed && <h2 className="text-lg font-semibold">OrbitReach</h2>}
                </div>
            </SidebarHeader>

            <SidebarContent>
                {menuGroups.map((group) => (
                    <SimpleNavMenu key={group.title} items={group.items} title={group.title} />
                ))}
            </SidebarContent>

            <SidebarFooter>
                <div className={cn(!isCollapsed && 'p-2')}>
                    <UserCard />
                </div>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar
