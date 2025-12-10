import React from 'react'

import BlueskyIcon from '@/shared/icon/bluesky-icon'
import FacebookIcon from '@/shared/icon/facebook-icon'
import InstagramIcon from '@/shared/icon/instagram-icon'
import LinkedinIcon from '@/shared/icon/linkedin-icon'
import PinterestIcon from '@/shared/icon/pinterest-icon'
import ThreadsIcon from '@/shared/icon/threads-icon'
import TikTokIcon from '@/shared/icon/tik-tok-icon'
import YouTubeIcon from '@/shared/icon/youtube-icon'
import AnimatedContent from '@/shared/ui/AnimatedContent'

type Platform = {
    name: string
    icon: React.ReactNode
    summary: string
    soon?: boolean
}

const platforms: Platform[] = [
    {
        name: 'Threads',
        icon: <ThreadsIcon className="fill-primary" />,
        summary: 'Fast replies and daily touchpoints without juggling apps.',
    },
    {
        name: 'Instagram',
        icon: <InstagramIcon className="fill-primary" />,
        summary: 'Plan reels, carousels, and feed drops in one place.',
    },
    {
        name: 'Facebook',
        icon: <FacebookIcon className="fill-primary" />,
        summary: 'Keep Pages and Groups humming with scheduled posts.',
    },
    {
        name: 'Pinterest',
        icon: <PinterestIcon className="fill-primary" />,
        summary: 'Batch pin ideas so inspiration never slips by. Make your visuals viral.',
    },
    {
        name: 'Linkedin',
        icon: <LinkedinIcon className="fill-primary" />,
        summary: 'Line up thought leadership while you’re in the flow.',
    },
    {
        name: 'Bluesky',
        icon: <BlueskyIcon className="fill-primary" />,
        summary: 'Stay visible on the newest networks without extra work.',
    },
    {
        name: 'YouTube',
        icon: <YouTubeIcon className="fill-primary" />,
        summary: 'Stage long-form drops with the rest of your calendar.',
        soon: true,
    },
    {
        name: 'TikTok',
        icon: <TikTokIcon className="fill-primary" />,
        summary: 'Queue short hits alongside every other channel.',
        soon: true,
    },
]

export const Platforms = () => {
    return (
        <section className="w-full max-w-screen-xl mx-auto flex flex-col gap-10 px-4 py-10 md:py-14" id="platform">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                        OrbitReach integrates everywhere
                    </p>
                    <h2 className="text-3xl leading-10 sm:text-4xl md:text-[40px] md:leading-[3.25rem] font-bold tracking-tight">
                        Publish once, land on every channel
                    </h2>
                </div>
                <p className="max-w-xl text-base text-slate-600 dark:text-slate-300">
                    Mix live platforms with what’s launching next—no extra tabs, no scattered drafts.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {platforms.map((platform, index) => (
                    <AnimatedContent key={platform.name} delay={index * 0.05} direction="vertical" duration={0.45}>
                        <div className="group relative flex items-start  gap-4 rounded-2xl border border-primary/15 bg-white p-5 shadow-lg shadow-primary/10 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 dark:border-primary/20 dark:bg-background">
                            <div className="relative">
                                <div className="absolute inset-0 -z-10 rounded-full bg-primary/15 blur-xl opacity-0 transition duration-200 group-hover:opacity-80" />
                                <div className="flex size-12 items-center justify-center rounded-full p-3 bg-primary/10 text-primary">
                                    {platform.icon}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                        {platform.name}
                                    </h3>
                                    {platform.soon && (
                                        <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">
                                            Coming Soon
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                    {platform.summary}
                                </p>
                            </div>
                        </div>
                    </AnimatedContent>
                ))}
            </div>
        </section>
    )
}
