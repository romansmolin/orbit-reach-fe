import { cookies } from 'next/headers'

import { getUserSettingsByUserId } from '@/entities/user/server'
import { NewPostPage } from '@/views/new-post-page'

interface NewPostpProps {
    searchParams: Promise<{ copy: string }>
}

const NewPost = async ({ searchParams }: NewPostpProps) => {
    const { copy } = await searchParams
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    let initialTimezone: string | undefined

    if (token?.value) {
        try {
            const { userSettings } = await getUserSettingsByUserId(token.value)
            initialTimezone = userSettings?.settings?.timezone
        } catch {
            initialTimezone = undefined
        }
    }

    return (
        <div className="flex flex-col">
            <div className="mb-6 flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Create New Post</h1>
                <p>Create and schedule your social media content</p>
            </div>

            <div className="flex-1">
                <NewPostPage copyData={copy} initialTimezone={initialTimezone} />
            </div>
        </div>
    )
}

export default NewPost
