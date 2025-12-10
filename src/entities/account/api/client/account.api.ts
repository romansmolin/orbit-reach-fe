import { createApi } from '@reduxjs/toolkit/query/react'

import { userApi } from '@/entities/user'
import baseQuery from '@/shared/api/base-query'

import { Account, PinterestAccountBoard } from '../../model/account.interface'

export const accountsApi = createApi({
    reducerPath: 'accountsApi',
    baseQuery,
    endpoints: (builder) => ({
        getAccounts: builder.query<Account[], void>({
            query: () => '/accounts',
            transformResponse: (response: { accounts: Account[] }) => {
                return response.accounts
            },
            keepUnusedDataFor: 300,
        }),
        getPinterestBoardsByAccountId: builder.query<{ boards: PinterestAccountBoard[] }, string>({
            query: (accountId) => `/accounts/${accountId}/pinterest-boards`,
        }),
        connectBlusekyAccount: builder.mutation<Account, { username: string; password: string }>({
            query: ({ username, password }) => ({
                url: '/bluesky/connect',
                method: 'POST',
                body: { identifier: username, appPassword: password },
            }),
        }),
        deleteAccount: builder.mutation<void, { accountId: string }>({
            query: ({ accountId }) => ({
                url: `/accounts/${accountId}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await queryFulfilled
                dispatch(userApi.util.invalidateTags(['PostLimits']))
            },
        }),
    }),
})

export const {
    useGetAccountsQuery,
    useGetPinterestBoardsByAccountIdQuery,
    useConnectBlusekyAccountMutation,
    useDeleteAccountMutation,
} = accountsApi
