import { createApi } from '@reduxjs/toolkit/query/react'

import baseQuery from '@/shared/api/base-query'

import { IUserData, IUserSettings } from '../../model/user.types'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery,
    tagTypes: ['PostLimits', 'UserSettings'],
    endpoints: (builder) => ({
        getUserInfo: builder.query<IUserData, void>({
            query: () => '/user/user-info',
            providesTags: ['PostLimits'],
        }),
        getUserSettings: builder.query<IUserSettings | null, void>({
            query: () => '/user/settings',
            transformResponse: (response: { settings?: IUserSettings | null }) => response?.settings ?? null,
            providesTags: ['UserSettings'],
        }),
        setUserPrefferedTimezone: builder.mutation<void, { timezone: string }>({
            query: ({ timezone }) => ({
                url: '/user/settings/timezone',
                method: 'POST',
                body: {
                    timezone,
                },
            }),
            invalidatesTags: ['UserSettings'],
        }),
        changeUserPrefferedTimezone: builder.mutation<void, { timezone: string }>({
            query: ({ timezone }) => ({
                url: '/user/settings/timezone',
                method: 'PUT',
                body: {
                    timezone,
                },
            }),
            invalidatesTags: ['UserSettings'],
        }),
        updateUserPlan: builder.mutation<
            void,
            { planName: 'PRO' | 'STARTER'; planType?: 'monthly' | 'yearly' }
        >({
            query: ({ planName, planType }) => {
                const body: { planName: 'PRO' | 'STARTER'; planType?: 'monthly' | 'yearly' } = {
                    planName,
                }

                if (planType) {
                    body.planType = planType
                }

                return {
                    url: '/user/update-subscription',
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['UserSettings', 'PostLimits'],
        }),
        cancelSubscription: builder.mutation<void, void>({
            query: () => ({
                url: '/user/cancel-subscription',
                method: 'POST',
            }),
            invalidatesTags: ['PostLimits'],
        }),
    }),
})

export const {
    useGetUserInfoQuery,
    useGetUserSettingsQuery,
    useSetUserPrefferedTimezoneMutation,
    useChangeUserPrefferedTimezoneMutation,
    useUpdateUserPlanMutation,
    useCancelSubscriptionMutation,
} = userApi
