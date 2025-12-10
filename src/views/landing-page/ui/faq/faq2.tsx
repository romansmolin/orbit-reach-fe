'use client'

import { useState } from 'react'

type FAQItem = {
    question: string
    answer: string
}

const FAQ_DATA: FAQItem[] = [
    {
        question: 'Do you offer a free plan?',
        answer: 'Yes — OrbitReach includes a forever-free plan with all essential features for creators. No credit card required.',
    },
    {
        question: 'Which platforms are supported?',
        answer: 'Instagram, LinkedIn, Threads, Pinterest, Bluesky, and Facebook. YouTube and TikTok support is coming soon.',
    },
    {
        question: 'Can I connect multiple accounts from the same platform?',
        answer: 'Yes. You can connect multiple profiles per platform, as long as you stay within your plan limits.',
    },
    {
        question: 'Is there a limit on how many posts I can schedule?',
        answer: 'OrbitReach uses generous scheduling and publishing limits designed to feel unlimited for normal use while staying within safe API boundaries.',
    },
    {
        question: 'How does the AI caption assistant work?',
        answer: 'You enter a prompt or paste an idea — the AI generates multiple caption options. You can fully edit anything before scheduling.',
    },
]

const Faq2 = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const toggle = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index))
    }

    return (
        <section
            className="relative isolate overflow-hidden rounded-3xl bg-muted/60 px-6 py-14 sm:px-8 md:py-20"
            id="faq"
        >
            <div className="mx-auto flex max-w-5xl flex-col gap-12 md:flex-row md:items-start md:gap-16">
                <div className="flex basis-1/2 flex-col text-left">
                    <p className="mb-3 inline-block font-semibold uppercase tracking-[0.14em] text-primary">
                        F.A.Q
                    </p>
                    <p className="text-3xl font-extrabold text-foreground sm:text-4xl">
                        Frequently Asked Questions
                    </p>
                    <p className="mt-4 max-w-xl text-base text-muted-foreground">
                        Answers to the things people ask most before they start scheduling with OrbitReach.
                    </p>
                </div>

                <ul className="basis-1/2 divide-y divide-border/60 rounded-2xl bg-background/60 p-2 shadow-lg shadow-primary/5 backdrop-blur">
                    {FAQ_DATA.map((faq, index) => {
                        const isOpen = openIndex === index
                        return (
                            <li key={faq.question} className="group px-4">
                                <button
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center gap-2 py-4 text-left text-base font-semibold md:text-lg"
                                    onClick={() => toggle(index)}
                                >
                                    <span className="flex-1 text-foreground">{faq.question}</span>
                                    <svg
                                        className="ml-auto h-4 w-4 flex-shrink-0 fill-current text-muted-foreground"
                                        viewBox="0 0 16 16"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            className={`origin-center transition duration-200 ${
                                                isOpen ? 'rotate-90 opacity-0' : ''
                                            }`}
                                            height="2"
                                            rx="1"
                                            width="16"
                                            y="7"
                                        />
                                        <rect
                                            className={`origin-center transition duration-200 ${
                                                isOpen ? '' : 'rotate-90'
                                            }`}
                                            height="2"
                                            rx="1"
                                            width="16"
                                            y="7"
                                        />
                                    </svg>
                                </button>
                                <div
                                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="pb-4 text-base leading-relaxed text-muted-foreground">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                    <li className="pt-2">
                        <a
                            className="group inline-flex items-center gap-2 px-2 py-2 font-medium text-primary"
                            href="#"
                        >
                            See more
                            <svg
                                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 100 50"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M78.1233 27.7777H21.8758C20.1259 27.7777 18.751 26.5555 18.751 24.9999C18.751 23.4444 20.1259 22.2222 21.8758 22.2222H78.1233C79.8732 22.2222 81.2482 23.4444 81.2482 24.9999C81.2482 26.5555 79.8732 27.7777 78.1233 27.7777Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M62.4999 47.2222C62.09 47.2266 61.6837 47.1548 61.307 47.0112C60.9302 46.8677 60.5915 46.6557 60.3125 46.3888C59.0625 45.2777 59.0625 43.5555 60.3125 42.4444L79.9991 24.9444L60.3125 7.4444C59.0625 6.33329 59.0625 4.61107 60.3125 3.49996C61.5624 2.38885 63.4998 2.38885 64.7498 3.49996L86.6238 22.9444C87.8737 24.0555 87.8737 25.7777 86.6238 26.8888L64.7498 46.3333C64.1248 46.8888 63.3123 47.1666 62.5624 47.1666L62.4999 47.2222Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Faq2
