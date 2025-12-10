import { BadgeCheck, Clock4, Layers, LayoutDashboard } from 'lucide-react'

import AnimatedContent from '@/shared/ui/AnimatedContent'
import { Globe } from '@/shared/ui/globe'

import { AnimatedBeamMultipleOutputDemo } from '../animated-beam-multiple-output'

const Features3 = () => {
    return (
        <div className="flex flex-col gap-10 py-10 md:gap-14 md:py-16">
            <div className="flex flex-col gap-3 text-center">
                <p className="text-primary text-sm font-semibold uppercase tracking-[0.14em]">Feature stack</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    What <span className="text-primary">OrbitReach</span> Makes Effortless
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                    A bento board of everything you need: publish, approve, schedule, and tailor in one sweep.
                </p>
            </div>

            <section
                className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4"
                id="features"
            >
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-12">
                    <AnimatedContent className="relative min-h-[300px] overflow-hidden rounded-2xl bg-muted md:col-span-7 md:row-span-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
                        <div className="relative flex h-full flex-col justify-between p-8">
                            <div className="space-y-3 max-w-lg">
                                <p className="text-sm font-semibold text-primary uppercase tracking-wide">Reach</p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                                    Own every channel without leaving your flow.
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Keep your brand orbit aligned while campaigns run across socials in sync.
                                </p>
                            </div>
                            <Globe className="top-36" />
                        </div>
                    </AnimatedContent>

                    <AnimatedContent className="relative min-h-[300px] overflow-hidden rounded-2xl bg-muted md:col-span-5 md:row-span-2">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                        <div className="relative flex h-full flex-col justify-between p-8">
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                                    Automate output
                                </p>
                                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white leading-tight">
                                    Ship faster, edit less, recycle more.
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Templates, smart timing, and AI handoffs keep your calendar full and on-brand.
                                </p>
                            </div>
                            <AnimatedBeamMultipleOutputDemo className="mx-auto h-[240px] w-[90%] p-0" />
                        </div>
                    </AnimatedContent>

                    <AnimatedContent className="rounded-2xl bg-muted p-6 flex flex-col gap-3 md:col-span-4">
                        <span className="rounded-full bg-primary/10 w-fit p-2 text-primary">
                            <LayoutDashboard />
                        </span>
                        <h4 className="text-xl font-semibold">Command center</h4>
                        <p className="text-slate-600 dark:text-slate-300">
                            One cockpit for brands, drafts, approvals, and calendars—no tab maze.
                        </p>
                    </AnimatedContent>

                    <AnimatedContent className="rounded-2xl bg-muted p-6 flex flex-col gap-3 md:col-span-4">
                        <span className="rounded-full bg-primary/10 w-fit p-2 text-primary">
                            <BadgeCheck />
                        </span>
                        <h4 className="text-xl font-semibold">Approvals</h4>
                        <p className="text-slate-600 dark:text-slate-300">
                            Route drafts to reviewers, capture notes, and launch the moment it&apos;s greenlit.
                        </p>
                    </AnimatedContent>

                    <AnimatedContent className="rounded-2xl bg-muted p-6 flex flex-col gap-3 md:col-span-4">
                        <span className="rounded-full bg-primary/10 w-fit p-2 text-primary">
                            <Clock4 />
                        </span>
                        <h4 className="text-xl font-semibold">Timezone smart</h4>
                        <p className="text-slate-600 dark:text-slate-300">
                            Set local windows once—OrbitReach converts and fires when each audience is active.
                        </p>
                    </AnimatedContent>

                    <AnimatedContent className="rounded-2xl bg-muted p-6 flex flex-col gap-3 md:col-span-6">
                        <span className="rounded-full bg-primary/10 w-fit p-2 text-primary">
                            <Layers />
                        </span>
                        <h4 className="text-xl font-semibold">Unified content library</h4>
                        <p className="text-slate-600 dark:text-slate-300">
                            Keep every asset, caption, and draft in one place so teams stay aligned before posting.
                        </p>
                    </AnimatedContent>

                    <AnimatedContent className="rounded-2xl bg-muted p-6 flex flex-col gap-3 md:col-span-6">
                        <span className="rounded-full bg-primary/10 w-fit p-2 text-primary">
                            <Layers />
                        </span>
                        <h4 className="text-xl font-semibold">Tailored cross-posting</h4>
                        <p className="text-slate-600 dark:text-slate-300">
                            Blast everywhere in one move while captions, tags, and links adapt to each channel.
                        </p>
                    </AnimatedContent>
                </div>
            </section>
        </div>
    )
}

export default Features3
