import { AxiosError } from 'axios'

import api from '@/shared/api/axios'
import { logoutAndRedirectHomeServer } from '@/shared/lib/auth/session.server'

import { IPost, IPostFilters, PostTarget } from '../../model/post.types'

export const getPostsByFilters = async (
    token: string,
    currentPage: number,
    filters?: IPostFilters
): Promise<{ posts: IPost[]; total: number; page: number; error?: string }> => {
    try {
        const res = await api.get('/posts', {
            params: {
                platform: filters?.platform,
                status: filters?.status,
                fromDate: filters?.fromDate || new Date(new Date().getFullYear(), 0, 1),
                toDate: filters?.toDate || new Date(),
                page: currentPage,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const { posts, total, page } = res.data

        return { posts, total, page }
    } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.status === 401) {
            await logoutAndRedirectHomeServer()
        }

        const message = err instanceof AxiosError ? err.message : 'Unknown error while fetching posts'

        return {
            posts: [],
            total: 0,
            page: 1,
            error: message,
        }
    }
}

export const getFailedPostTargets = async (
    token: string
): Promise<{ failedPostTargets: PostTarget[]; error?: string }> => {
    try {
        const { data } = await api.get('/posts/failed', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const { failedPostTargets } = data

        return { failedPostTargets }
    } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.status === 401) {
            await logoutAndRedirectHomeServer()
        }

        const message = err instanceof AxiosError ? err.message : 'Unknown error while fetching posts'

        return {
            failedPostTargets: [],
            error: message,
        }
    }
}
