import { createApi } from '@reduxjs/toolkit/query/react'

import { userApi } from '@/entities/user/api/client/user.api'
import baseQuery from '@/shared/api/base-query'

import { AiOutput, AiRequest } from '../../model/ai-assistance-form-schema'
import { IPost } from '../../model/post.types'

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery,
    tagTypes: ['PostsByDate', 'FailedPosts', 'PostLimits'],
    endpoints: (builder) => ({
        createPost: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: '/post',
                method: 'POST',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['PostsByDate', 'PostLimits', 'FailedPosts'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await queryFulfilled
                dispatch(userApi.util.invalidateTags(['PostLimits']))
            },
        }),
        editPost: builder.mutation<void, { formData: FormData; postId: string }>({
            query: ({ postId, formData }) => ({
                url: `/post/${postId}`,
                method: 'PUT',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['PostsByDate', 'PostLimits'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await queryFulfilled
                dispatch(userApi.util.invalidateTags(['PostLimits']))
            },
        }),
        deletePost: builder.mutation<void, string>({
            query: (postId) => ({
                url: `/post/${postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PostLimits', 'FailedPosts'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await queryFulfilled
                dispatch(userApi.util.invalidateTags(['PostLimits']))
            },
        }),
        retryPostTarget: builder.mutation<void, { postId: string; socialAccountId: string }>({
            query: ({ postId, socialAccountId }) => {
                return {
                    url: '/post/retry',
                    method: 'POST',
                    body: {
                        postId,
                        socialAccountId,
                    },
                }
            },
            invalidatesTags: ['FailedPosts', 'PostLimits'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await queryFulfilled
                dispatch(userApi.util.invalidateTags(['PostLimits']))
            },
        }),
        getPostsByDate: builder.query<{ posts: IPost[] }, { fromDate: number; toDate: number }>({
            query: ({ fromDate, toDate }) => {
                return {
                    url: '/posts/by-date',
                    method: 'GET',
                    params: {
                        fromDate: fromDate,
                        toDate: toDate,
                    },
                }
            },
            providesTags: ['PostsByDate'],
        }),
        getFailedPostsCount: builder.query<{ failedCount: number }, void>({
            query: () => `/posts/failed/count`,
            providesTags: ['FailedPosts'],
        }),
        requestAiAssistance: builder.mutation<AiOutput, AiRequest>({
            query: (payload) => {
                return {
                    url: '/ai/content',
                    method: 'POST',
                    body: { ...payload },
                }
            },
        }),
    }),
})

export const {
    useCreatePostMutation,
    useEditPostMutation,
    useDeletePostMutation,
    useLazyGetPostsByDateQuery,
    useGetPostsByDateQuery,
    useGetFailedPostsCountQuery,
    useRetryPostTargetMutation,
    useRequestAiAssistanceMutation,
} = postApi
