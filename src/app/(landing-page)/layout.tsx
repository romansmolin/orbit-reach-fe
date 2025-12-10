import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { LoginButton } from '@/features/auth/ui/login-button'
import { GoogleAnalytics } from '@/shared/components'

import Footer2 from '../_layout/basic/footer2'
import Header01 from '../_layout/basic/header01'
import '../globals.css'

const montserrat = Montserrat({
    variable: '--montserrat',
    subsets: ['latin'],
    weight: ['400', '500'],
})

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://zapshipr.com').replace(/\/$/, '')
const ogImage = `${siteUrl}/assets/meta.png`

const navigationData = [
    { title: 'Home', href: '/' },
    { title: 'Platforms', href: '#platform' },
    { title: 'Features', href: '#features' },
    { title: 'Testimonials', href: '#testimonials' },
    { title: 'Pricing', href: '#pricing' },
    { title: 'FAQ', href: '#faq' },
]

export const metadata: Metadata = {
    title: 'OrbitReach | Schedule Social Content with Ease',
    description:
        'Plan, write, and schedule high-performing social posts across every channel from a single dashboard.',
    alternates: {
        canonical: siteUrl,
    },
    openGraph: {
        type: 'website',
        url: siteUrl,
        siteName: 'OrbitReach',
        title: 'OrbitReach | Schedule Social Content with Ease',
        description:
            'Plan, write, and schedule high-performing social posts across every channel from a single dashboard.',
        images: [
            {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: 'OrbitReach social scheduling platform preview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'OrbitReach | Schedule Social Content with Ease',
        description:
            'Plan, write, and schedule high-performing social posts across every channel from a single dashboard.',
        images: [ogImage],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html suppressHydrationWarning className={`${montserrat.variable} overflow-x-hidden`} lang="en">
            <body className="antialiased overflow-x-hidden">
                <GoogleAnalytics measurementId="G-37FFNP35CS" />
                <Header01 actions={<LoginButton />} navigationData={navigationData} />
                <main className="flex flex-col mx-auto ">{children}</main>
                <Footer2 />
            </body>
        </html>
    )
}
