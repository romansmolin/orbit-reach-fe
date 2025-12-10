'use server'

import { cookies } from 'next/headers'

// Server action to clear all cookies (including HttpOnly) so client-side hard reload
// can fully reset session/auth state.
export async function hardReload() {
    const store = await cookies()
    const names = store.getAll().map((c) => c.name)
    names.forEach((name) => store.delete(name))
    return { cleared: names }
}
