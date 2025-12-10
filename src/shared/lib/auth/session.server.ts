'use server'

import { redirect } from 'next/navigation'

export const logoutAndRedirectHomeServer = async (options?: { redirectPath?: string }) => {
    const targetPath = options?.redirectPath ?? '/'
    redirect(targetPath)
}
