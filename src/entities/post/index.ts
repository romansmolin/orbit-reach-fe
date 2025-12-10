import { useRequestAiAssistanceMutation } from './api/client/post.api'
import { aiApiPayloadSchema } from './model/ai-assistance-form-schema'
import { PostFormSchema } from './model/post-form-schema'
import { useRtkPostService } from './model/use-rtk-post-service'
import PostCard from './ui/post-card'
import PostMinimalisticCards from './ui/post-minimalistic-card'
import PostTargetAlert from './ui/post-target-allert'

// Export specific types from post.types (excluding PostFormSchema to avoid conflicts)
export {
    useCreatePostMutation,
    useDeletePostMutation,
    useEditPostMutation,
    useLazyGetPostsByDateQuery,
    useRetryPostTargetMutation,
    useGetFailedPostsCountQuery,
    postApi,
} from './api/client/post.api'

export {
    type BasePost,
    type IPost,
    type IPostFilters,
    type IPostService,
    type MediaPost,
    MediaType,
    PostStatus,
    type PostTarget,
    PostType,
    type ScheduledDate,
    type TextPost,
} from './model/post.types'

export type { PostFormSchema }
export {
    aiApiPayloadSchema,
    PostCard,
    PostMinimalisticCards,
    PostTargetAlert,
    useRequestAiAssistanceMutation,
    useRtkPostService,
}
