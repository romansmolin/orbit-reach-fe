import {
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import { logoutAndRedirectHome } from '@/shared/lib/auth/session'

const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
})

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    const result = await rawBaseQuery(args, api, extraOptions)

    if (result.error?.status === 401) {
        logoutAndRedirectHome()
    }

    return result
}

export default baseQuery
