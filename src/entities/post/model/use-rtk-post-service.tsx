// services/useRtkPostService.ts
import {
    PostStatus,
    PostType,
    ScheduledDate,
    useCreatePostMutation,
    useDeletePostMutation,
    useEditPostMutation,
    useLazyGetPostsByDateQuery,
    useRetryPostTargetMutation,
} from '@/entities/post'
import { IPost, IPostService } from '@/entities/post/model/post.types'
import { PostFormSchema } from '@/entities/post/model/post-form-schema'
import { convertLocalTimeToUtcISOString } from '@/shared/utils/timezone'

function buildFormData(
    posts: PostFormSchema[],
    postType: PostType,
    shouldSchedule: boolean,
    scheduleTime: ScheduledDate,
    media?: File[] | null,
    mainCaption?: string | null,
    status?: PostStatus,
    coverTimestamp?: number,
    coverImage?: File,
    copyDataUrls?: string[],
    postNow?: boolean
) {
    const formData = new FormData()
    const resolvedStatus = status ?? (shouldSchedule ? PostStatus.PENDING : PostStatus.DONE)

    formData.append('postType', postType)
    formData.append('postStatus', resolvedStatus)

    if (media && media.length > 0 && postType === PostType.media) {
        media.forEach((file, index) => {
            formData.append(`media[${index}]`, file)
        })
    }

    if (mainCaption) {
        formData.append('mainCaption', mainCaption)
    }

    if (coverTimestamp !== undefined) {
        formData.append('coverTimestamp', coverTimestamp.toString())
    }

    if (coverImage) {
        formData.append('coverImage', coverImage)
    }

    if (postNow) {
        formData.append('postNow', String(postNow))
    }

    const { timezone, timeZone } = scheduleTime as ScheduledDate & { timeZone?: string }
    const scheduledIso = convertLocalTimeToUtcISOString({
        date: scheduleTime.date,
        time: scheduleTime.time,
        timezone: timezone ?? timeZone,
    })

    formData.append('scheduledTime', scheduledIso)

    if (copyDataUrls) formData.append('copyDataUrls', JSON.stringify(copyDataUrls))

    formData.append(
        'posts',
        JSON.stringify(
            posts.map((post) => ({
                account: post.account,
                platform: post.platform,
                text: post.text,
                ...('title' in post && post.title ? { title: post.title } : {}),
                ...(post.pinterestBoardId ? { pinterestBoardId: post.pinterestBoardId } : {}),
                ...(post.tags ? { tags: post.tags } : {}),
                ...(post.links ? { links: post.links } : {}),
                ...(post.isAutoMusicEnabled !== undefined
                    ? { isAutoMusicEnabled: post.isAutoMusicEnabled }
                    : {}),
                ...(post.instagramFacebookPageId
                    ? { instagramFacebookPageId: post.instagramFacebookPageId }
                    : {}),
                ...(post.threadsReplies ? { threadsReplies: post.threadsReplies } : {}),
            }))
        )
    )

    return formData
}

export const useRtkPostService = (): IPostService & {
    createStatus: { isLoading: boolean; isError: boolean; isSuccess: boolean }
    editStatus: { isLoading: boolean; isError: boolean; isSuccess: boolean }
    deleteStatus: { isLoading: boolean; isError: boolean; isSuccess: boolean }
    getPostsByDateStatus: { isLoading: boolean; isError: boolean; isSuccess: boolean }
    retryPostTargetStatus: { isLoading: boolean; isError: boolean; isSuccess: boolean }
} => {
    const [createPost, createStatus] = useCreatePostMutation()
    const [editPostTrigger, editStatus] = useEditPostMutation()
    const [retryPostTarget, retryPostTargetStatus] = useRetryPostTargetMutation()

    const [deletePostTrigger, deleteStatus] = useDeletePostMutation()
    const [getPostsByDateTrigger, getPostsByDateStatus] = useLazyGetPostsByDateQuery()

    return {
        sendPosts: async (
            posts,
            postType,
            shouldSchedule,
            scheduleTime,
            media,
            mainCaption,
            status,
            coverTimestamp,
            coverImage,
            copyDataUrls,
            postNow
        ) => {
            const formData = buildFormData(
                posts,
                postType,
                shouldSchedule,
                scheduleTime,
                media,
                mainCaption,
                status,
                coverTimestamp,
                coverImage,
                copyDataUrls,
                postNow
            )
            await createPost(formData).unwrap()
        },

        editPost: async (
            postId,
            posts,
            postType,
            shouldSchedule,
            scheduleTime,
            media,
            mainCaption,
            coverTimestamp,
            coverImage
        ) => {
            const formData = buildFormData(
                posts,
                postType,
                shouldSchedule,
                scheduleTime,
                media,
                mainCaption,
                undefined,
                coverTimestamp,
                coverImage
            )
            await editPostTrigger({ postId, formData }).unwrap()
        },

        retryPostTarget: async (postId, socialAccountId) => {
            await retryPostTarget({ postId, socialAccountId }).unwrap()
        },

        deletePostById: async (postId) => {
            await deletePostTrigger(postId).unwrap()
        },

        getPostsByDate: async (fromDate, toDate) => {
            const { posts } = await getPostsByDateTrigger({
                fromDate: fromDate.getTime(),
                toDate: toDate.getTime(),
            }).unwrap()
            return { posts: posts as IPost[] }
        },
        // Статусы для каждой операции
        createStatus: {
            isLoading: createStatus.isLoading,
            isError: createStatus.isError,
            isSuccess: createStatus.isSuccess,
        },
        editStatus: {
            isLoading: editStatus.isLoading,
            isError: editStatus.isError,
            isSuccess: editStatus.isSuccess,
        },
        deleteStatus: {
            isLoading: deleteStatus.isLoading,
            isError: deleteStatus.isError,
            isSuccess: deleteStatus.isSuccess,
        },
        getPostsByDateStatus: {
            isLoading: getPostsByDateStatus.isLoading,
            isError: getPostsByDateStatus.isError,
            isSuccess: getPostsByDateStatus.isSuccess,
        },
        retryPostTargetStatus: {
            isLoading: retryPostTargetStatus.isLoading,
            isError: retryPostTargetStatus.isError,
            isSuccess: retryPostTargetStatus.isSuccess,
        },
    }
}
