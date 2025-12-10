import { ReactNode } from 'react'

import { ArrowRight, Blocks, Settings2 } from 'lucide-react'
import Link from 'next/link'

import { AccountPlatform, accountsPlatformConfig } from '@/entities/account'
import FacebookIcon from '@/shared/icon/facebook-icon'
import InstagramIcon from '@/shared/icon/instagram-icon'
import LinkedinIcon from '@/shared/icon/linkedin-icon'
import PinterestIcon from '@/shared/icon/pinterest-icon'
// import ThreadsIcon from '@/shared/icon/threads-icon'
// import TikTokIcon from '@/shared/icon/tik-tok-icon'
import { cn } from '@/shared/lib/utils'
import AnimatedContent from '@/shared/ui/AnimatedContent'
import { AnimatedList } from '@/shared/ui/animated-list'
import { Button } from '@/shared/ui/button'
import { Marquee } from '@/shared/ui/marquee'

interface Item {
    name: string
    description: string
    icon: string
    color: string
    time: string
}

let notifications = [
    {
        name: 'New Follower',
        description: 'Alex Johnson started following you',
        time: '15m ago',
        icon: '👤',
        color: '#00C9A7',
    },
    {
        name: 'Post Liked',
        description: 'Emma liked your photo',
        time: '12m ago',
        icon: '❤️',
        color: '#FF3D71',
    },
    {
        name: 'New Comment',
        description: "Chris commented: 'This looks amazing!'",
        time: '10m ago',
        icon: '💬',
        color: '#FFB800',
    },
    {
        name: 'Mention',
        description: 'Sarah mentioned you in a post',
        time: '8m ago',
        icon: '🔔',
        color: '#1E86FF',
    },
    {
        name: 'New Message',
        description: 'Daniel sent you a message',
        time: '5m ago',
        icon: '✉️',
        color: '#7B61FF',
    },
    {
        name: 'Story View',
        description: 'Mia viewed your story',
        time: '3m ago',
        icon: '👀',
        color: '#FFB800',
    },
    {
        name: 'Repost',
        description: 'Liam reposted your video',
        time: '2m ago',
        icon: '🔁',
        color: '#1E86FF',
    },
    {
        name: 'Tagged in Photo',
        description: 'Olivia tagged you in a picture',
        time: '1m ago',
        icon: '🏷️',
        color: '#00C9A7',
    },
]

const sellingPoints = [
    // {
    //     name: 'Threads',
    //     username: '@threads',
    //     body: 'Schedule threads in advance and keep your audience engaged without manual posting.',
    //     icon: <ThreadsIcon className="size-4 sm:size-6" />,
    //     bgColor: accountsPlatformConfig[AccountPlatform.x].badgeColor,
    // },
    {
        name: 'Instagram',
        username: '@instagram',
        body: 'Plan and auto-publish posts and reels to grow your Instagram presence consistently.',
        icon: <InstagramIcon className="size-4 sm:size-6" />,
        bgColor: accountsPlatformConfig[AccountPlatform.instagram].badgeColor,
    },
    {
        name: 'LinkedIn',
        username: '@linkedin',
        body: 'Build authority by automating LinkedIn updates and staying visible to your network.',
        icon: <LinkedinIcon className="size-4 sm:size-6" />,
        bgColor: accountsPlatformConfig[AccountPlatform.linkedin].badgeColor,
    },
    // {
    //     name: 'TikTok',
    //     username: '@tiktok',
    //     body: 'Reach new audiences with scheduled TikTok content that posts at peak times.',
    //     icon: <TikTokIcon className="size-4 sm:size-6" />,
    //     bgColor: accountsPlatformConfig[AccountPlatform.tiktok].badgeColor,
    // },
    {
        name: 'Facebook',
        username: '@facebook',
        body: 'Save time by managing posts and campaigns across Facebook pages from one dashboard.',
        icon: <FacebookIcon className="size-4 sm:size-6" />,
        bgColor: accountsPlatformConfig[AccountPlatform.facebook].badgeColor,
    },
    {
        name: 'Pinterest',
        username: '@pinterest',
        body: 'Drive traffic to your website with automated pin scheduling for maximum visibility.',
        icon: <PinterestIcon className="size-4 sm:size-6" />,
        bgColor: accountsPlatformConfig[AccountPlatform.pinterest].badgeColor,
    },
]

const firstRow = sellingPoints.slice(0, sellingPoints.length / 2)
const secondRow = sellingPoints.slice(sellingPoints.length / 2)

notifications = Array.from({ length: 10 }, () => notifications).flat()

const Notification = ({ name, description, icon, color, time }: Item) => {
    return (
        <figure
            className={cn(
                'relative mx-auto min-h-fit w-full max-w-[95%] overflow-hidden rounded-2xl p-4 border',
                'transition-all duration-200',
                'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
                'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex size-10 items-center justify-center rounded-2xl"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <span className="text-lg">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
                        <span className="text-sm sm:text-lg">{name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </figcaption>
                    <p className="text-sm font-normal dark:text-white/60">{description}</p>
                </div>
            </div>
        </figure>
    )
}

const ReviewCard = ({
    name,
    username,
    body,
    icon,
    bgColor,
}: {
    name: string
    username: string
    body: string
    icon: ReactNode
    bgColor: string
}) => {
    return (
        <figure
            className={cn(
                'relative h-full w-48  overflow-hidden rounded-xl border p-3',
                'border-gray-950/[.1] bg-gray-950/[.01]',
                'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] '
            )}
        >
            <div className="flex flex-row items-center gap-2 sm:gap-3 w-full mb-2 sm:mb-3">
                <div
                    className={cn(
                        'flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br text-white shadow-sm',
                        bgColor
                    )}
                >
                    {icon}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                    <figcaption className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {name}
                    </figcaption>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{username}</p>
                </div>
            </div>

            <blockquote className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {body}
            </blockquote>
        </figure>
    )
}

const Features2 = () => {
    return (
        <div className="flex items-center justify-center py-10 md:py-14 p-4">
            <div className="w-full max-w-screen-lg mx-autopx-6">
                <h2 className="text-3xl leading-10 sm:text-4xl md:text-[40px] md:leading-[3.25rem] font-bold tracking-tight">
                    Design and Engage: <br />
                    Build Smarter Spaces and Strategies
                </h2>
                <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <AnimatedContent className="bg-muted rounded-xl pt-6 md:pt-8 pb-6 px-6 col-span-1 md:col-span-2 lg:col-span-1">
                        {/* Media 1 Mobile */}

                        <div className="md:hidden mb-6 aspect-video w-full bg-background border rounded-xl overflow-hidden">
                            <div className="relative flex w-full h-full items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 flex items-center">
                                    <Marquee className="[--duration:20s]">
                                        {notifications.slice(0, 5).map((notification, idx) => (
                                            <div key={idx} className="flex-shrink-0 mr-2">
                                                <Notification {...notification} />
                                            </div>
                                        ))}
                                    </Marquee>
                                </div>
                            </div>
                        </div>

                        <span className="text-2xl font-semibold tracking-tight">Plan Smarter</span>

                        <ul className="mt-6 space-y-4">
                            <li>
                                <div className="flex items-start gap-3">
                                    <Settings2 className="shrink-0" />
                                    <p className="-mt-0.5">
                                        Schedule posts across Instagram, TikTok, Threads, Pinterest, YouTube &
                                        Facebook..
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-start gap-3">
                                    <Blocks className="shrink-0" />
                                    <p className="-mt-0.5">Visualize your content with an easy-to-use calendar.</p>
                                </div>
                            </li>
                        </ul>

                        <Button asChild className="mt-12 w-full" size={'lg'}>
                            <Link href={'#pricing'}>
                                Build your strategy <ArrowRight />
                            </Link>
                        </Button>
                    </AnimatedContent>
                    {/* Media 1 Desktop */}
                    <AnimatedContent className="hidden md:block border max-h-[600px] border-border/80 bg-muted rounded-xl col-span-1 md:col-span-3 lg:col-span-2 overflow-hidden pt-3">
                        <div className="max-h-[342px] overflow-hidden">
                            <AnimatedList>
                                {notifications.map((item, idx) => (
                                    <Notification {...item} key={idx} />
                                ))}
                            </AnimatedList>
                        </div>
                    </AnimatedContent>

                    {/* Media 2 Desktop */}
                    <AnimatedContent className="hidden md:flex border border-border/80 bg-muted rounded-xl col-span-1 md:col-span-3 lg:col-span-2 items-center">
                        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                            <Marquee className="[--duration:20s]">
                                {firstRow.map((review) => (
                                    <ReviewCard key={review.username} {...review} />
                                ))}
                            </Marquee>
                            <Marquee reverse className="[--duration:20s]">
                                {secondRow.map((review) => (
                                    <ReviewCard key={review.username} {...review} />
                                ))}
                            </Marquee>
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r "></div>
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
                        </div>
                    </AnimatedContent>
                    {/* Card 2 */}
                    <AnimatedContent className="bg-muted rounded-xl pt-6 md:pt-8 pb-6 px-6 col-span-1 md:col-span-2 lg:col-span-1">
                        {/* Media 2 Mobile */}

                        <div className="md:hidden mb-6 aspect-video w-full bg-background border rounded-xl overflow-hidden">
                            <div className="relative flex w-full h-full items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 flex items-center">
                                    <Marquee className="[--duration:20s]">
                                        {firstRow.map((review) => (
                                            <ReviewCard key={review.username} {...review} />
                                        ))}
                                    </Marquee>
                                </div>
                            </div>
                        </div>

                        <span className="text-2xl font-semibold tracking-tight">Create Effortlessly</span>

                        <ul className="mt-6 space-y-4">
                            <li>
                                <div className="flex items-start gap-3">
                                    <Settings2 className="shrink-0" />
                                    <p className="-mt-0.5">
                                        Draft, edit, and save posts in one place — no more scattered apps.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-start gap-3">
                                    <Blocks className="shrink-0" />
                                    <p className="-mt-0.5">Keep inspiration alive by storing drafts for later.</p>
                                </div>
                            </li>
                        </ul>

                        <Button asChild className="mt-12 w-full" size={'lg'}>
                            <Link href={'#pricing'}>
                                Build your strategy <ArrowRight />
                            </Link>
                        </Button>
                    </AnimatedContent>
                </div>
            </div>
        </div>
    )
}

export default Features2
