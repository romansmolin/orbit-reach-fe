import AnimatedContent from '@/shared/ui/AnimatedContent'

const beforeConfig = {
    title: 'Manual Posting Slows You Down',
    items: [
        'Manual scheduling means peak windows slip by.',
        'Hopping between apps for every platform is chaotic.',
        'Repeating copy-and-paste kills time and focus.',
        'Without clear signals, you guess what to post next.',
    ],
}

const afterConfig = {
    title: 'Automated Publishing Keeps Momentum',
    items: [
        'Map campaigns once and publish everywhere in a click.',
        'Let smart timing hit each channel when your audience is on.',
        'Run every social account from one streamlined hub.',
        'See quick insights that point to your next winning post.',
    ],
}

export default function BeforeAfter() {
    const renderList = (items: string[]) => (
        <ul className="mt-6 space-y-3 text-base sm:text-lg">
            {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                    <div className="shrink-0 py-1.5">
                        <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 256 256"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" />
                        </svg>
                    </div>
                    {item}
                </li>
            ))}
        </ul>
    )

    return (
        <section className="flex flex-col gap-12 bg-primary py-8 md:py-14">
            <h2 className="text-center text-4xl sm:text-5xl md:text-6x tracking-tight md:leading-16 font-bold text-white">
                Get More from Every Post with <span className="italic">OrbitReach</span>
            </h2>
            <div className="mx-auto max-w-5xl px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 h-fit">
                    <AnimatedContent reverse direction="horizontal" duration={0.45}>
                        <div className="rounded-2xl bg-white flex-1 h-full">
                            <div className="p-8 sm:p-12">
                                <div className="inline-flex items-center gap-2">
                                    <svg
                                        aria-hidden="true"
                                        className="h-6 w-6 text-slate-500"
                                        fill="currentColor"
                                        viewBox="0 0 256 256"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M232,184a8,8,0,0,1-16,0A88,88,0,0,0,67.47,120.16l26.19,26.18A8,8,0,0,1,88,160H24a8,8,0,0,1-8-8V88a8,8,0,0,1,13.66-5.66l26.48,26.48A104,104,0,0,1,232,184Z"></path>
                                    </svg>
                                    <p className="text-base font-semibold text-slate-700">Before</p>
                                </div>
                                <h3 className="font-display mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                    {beforeConfig.title}
                                </h3>
                                <div className="text-slate-600">{renderList(beforeConfig.items)}</div>
                            </div>
                        </div>
                    </AnimatedContent>

                    <AnimatedContent direction="horizontal" duration={0.45}>
                        <div className="rounded-2xl bg-secondary dark:bg-background flex-1 h-full">
                            <div className="p-8 sm:p-12">
                                <div className="inline-flex items-center gap-2">
                                    <p className="text-base font-semibold">After</p>
                                    <svg
                                        aria-hidden="true"
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 256 256"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L212.69,104,170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66Zm-48-11.32-48-48A8,8,0,0,0,120,56V96.3A104.15,104.15,0,0,0,24,200a8,8,0,0,0,16,0,88.11,88.11,0,0,1,80-87.63V152a8,8,0,0,0,13.66,5.66l48-48A8,8,0,0,0,181.66,98.34Z"></path>
                                    </svg>
                                </div>
                                <h3 className="font-display mt-4 text-2xl font-bold tracking-tigh sm:text-3xl">
                                    {afterConfig.title}
                                </h3>
                                <div>{renderList(afterConfig.items)}</div>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </div>
        </section>
    )
}
