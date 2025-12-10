import { AxiosError } from 'axios'

import api from '@/shared/api/axios'
import { logoutAndRedirectHomeServer } from '@/shared/lib/auth/session.server'

import { IUserData, IUserSettings } from '../../model/user.types'

export const getUserSettingsByUserId = async (
    token: string
): Promise<{
    userSettings: { settings: IUserSettings } | null
    error: string | null
}> => {
    try {
        const { data: userSettings } = await api.get<{ settings: IUserSettings }>('/user/settings', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return {
            userSettings: userSettings,
            error: null,
        }
    } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.status === 401) {
            await logoutAndRedirectHomeServer()
        }

        const message = err instanceof AxiosError ? err.message : 'Unknown error while fetching posts'
        console.error('Failed to fetch user settings:', message)

        return {
            userSettings: null,
            error: message,
        }
    }
}

export const getUserInfo = async (
    token: string
): Promise<{
    userInfo: IUserData | null
    error: string | null
}> => {
    try {
        const { data: userInfo } = await api.get<IUserData>('/user/user-info', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return {
            userInfo,
            error: null,
        }
    } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.status === 401) {
            await logoutAndRedirectHomeServer()
        }

        const message = err instanceof AxiosError ? err.message : 'Unknown error while fetching posts'

        return {
            userInfo: null,
            error: message,
        }
    }
}
