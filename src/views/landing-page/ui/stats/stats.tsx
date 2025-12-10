import React from 'react'

import CountUp from '@/shared/ui/count-up'

const Stats = () => {
    return (
        <div className="flex items-center justify-center py-10 md:py-14">
            <div className="max-w-screen-xl mx-auto w-full px-6 xl:px-0">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Plan once. Post everywhere.</h2>
                <p className="mt-6 text-lg max-w-2xl text-foreground/70">
                    OrbitReach helps you create, schedule, and manage content across Instagram, TikTok, Threads,
                    Pinterest, YouTube, and Facebook from a single calendar. Stay consistent, save hours, and grow
                    faster.
                </p>

                <div className="mt-16 sm:mt-24 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-16 justify-center">
                    <div>
                        <span className="text-5xl md:text-6xl font-bold text-emerald-500">
                            <CountUp
                                className="count-up-text"
                                direction="up"
                                duration={0.6}
                                from={0}
                                separator=","
                                to={3.4}
                                onEnd={undefined}
                                onStart={undefined}
                            />{' '}
                            hours
                        </span>
                        <p className="mt-6 font-semibold text-xl">Weekly time saved</p>
                        <p className="mt-2 text-[17px] text-muted-foreground">
                            Average per active user after moving scheduling to OrbitReach.
                        </p>
                    </div>

                    <div>
                        <span className="text-5xl md:text-6xl font-bold text-indigo-500">
                            <CountUp
                                className="count-up-text"
                                direction="up"
                                duration={0.6}
                                from={0}
                                separator=","
                                to={13}
                                onEnd={undefined}
                                onStart={undefined}
                            />{' '}
                            days
                        </span>
                        <p className="mt-6 font-semibold text-xl">Yearly time saved</p>
                        <p className="mt-2 text-[17px] text-muted-foreground">
                            Based on weekly averages — more time for strategy and creativity.
                        </p>
                    </div>

                    <div>
                        <span className="text-5xl md:text-6xl font-bold text-rose-500">
                            <CountUp
                                className="count-up-text"
                                direction="up"
                                duration={0.15}
                                from={0}
                                separator=","
                                to={475.709}
                                onEnd={undefined}
                                onStart={undefined}
                            />
                        </span>
                        <p className="mt-6 font-semibold text-xl">Posts published</p>
                        <p className="mt-2 text-[17px] text-muted-foreground">
                            Platform-wide total with a +69% lift in engagement consistency.
                        </p>
                    </div>

                    <div>
                        <span className="text-5xl md:text-6xl font-bold text-blue-500">
                            <CountUp
                                className="count-up-text"
                                direction="up"
                                duration={0.6}
                                from={0}
                                separator=","
                                to={6}
                                onEnd={undefined}
                                onStart={undefined}
                            />
                        </span>
                        <p className="mt-6 font-semibold text-xl">Platforms supported</p>
                        <p className="mt-2 text-[17px] text-muted-foreground">
                            Instagram, TikTok, Threads, Pinterest, YouTube, Facebook — LinkedIn &amp; Bluesky
                            coming soon.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats
