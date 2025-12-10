import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { GoogleAnalytics } from '@/shared/components'
import { Toaster } from '@/shared/ui/sonner'

import Header from '../_layout/basic/header'
import { ThemeProvider } from '../_providers/theme-provider'
import '../globals.css'

export const metadata: Metadata = {
    title: 'OrbitReach Authentication',
    description: 'OrbitReach Authentication',
}

// eslint-disable-next-line unused-imports/no-unused-vars
const montserrat = Montserrat({
    variable: '--montserrat',
    subsets: ['latin'],
    weight: ['400', '500'],
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html suppressHydrationWarning lang="en">
            <body className={`antialiased overflow-hidden lg:overflow-hidden`}>
                <GoogleAnalytics measurementId="G-37FFNP35CS" />
                <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
                    <Header isAuth />
                    <main className="min-h-svh -mt-[88px] flex flex-col items-center justify-center gap-6 bg-background">
                        {children}
                    </main>
                    <Toaster richColors />
                </ThemeProvider>
            </body>
        </html>
    )
}
