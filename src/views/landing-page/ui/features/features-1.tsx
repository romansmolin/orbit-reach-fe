import React from 'react'

import { Blocks, Bot, BrickWallIcon, CircleArrowOutUpRightIcon, CircleDollarSign, Target } from 'lucide-react'

import AnimatedContent from '@/shared/ui/AnimatedContent'

const features = [
    {
        icon: CircleDollarSign,
        title: 'Fair Pricing',
        description: 'Stop overpaying for bloated tools — get only what you need at a price that makes sense.',
    },
    {
        icon: Blocks,
        title: 'No Overcomplicated Setups',
        description:
            'Forget about juggling Buffer, Zapier, or complex workflows. OrbitReach is simple and intuitive.',
    },
    {
        icon: Target,
        title: 'Essential Features Only',
        description: 'We cut the noise. Plan, schedule, and publish — without dozens of extras you’ll never use',
    },
    {
        icon: Bot,
        title: 'AI-Powered Help',
        description: 'No ideas? Our AI assistant helps you create scroll-stopping posts in seconds.',
    },
    // {
    //     icon: ChartPie,
    //     title: 'Advanced Analytics',
    //     description: 'Track engagement, clicks, and user activity with intuitive charts and reports.',
    // },
    {
        icon: BrickWallIcon,
        title: 'Smart Limit Handling',
        description:
            'We respect platform rules, avoid unexpected bans, and auto-resize your content for each network.',
    },
    {
        icon: CircleArrowOutUpRightIcon,
        title: 'Instant or Scheduled',
        description: 'Need reach now? Hit Publish Now. Want consistency? Schedule weeks in advance.',
    },
]

const Features1 = () => {
    return (
        <div className="flex items-center justify-center py-10 md:py-14">
            <div className="flex flex-col gap-12">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center">
                    Why <span className="text-primary">OrbitReach</span> is Different
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto px-6">
                    {features.map((feature) => (
                        <AnimatedContent key={feature.title}>
                            <div className="flex flex-col border rounded-xl py-6 px-5 ring-1 ring-inset ring-primary">
                                <div className="mb-3 h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <span className="text-lg font-semibold text-primary">{feature.title}</span>
                                <p className="mt-1 text-foreground/80 text-[15px]">{feature.description}</p>
                            </div>
                        </AnimatedContent>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features1
