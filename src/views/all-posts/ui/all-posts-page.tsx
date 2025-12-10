import React from 'react'

import { PlusCircleIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PostCard, type IPostFilters } from '@/entities/post'
import { getPostsByFilters } from '@/entities/post/server'
import { DeletePostButton } from '@/features/post/delete-post'
import { EditPostButton } from '@/features/post/edit-post'
import { PostFilters } from '@/features/post/filter-posts'
import { Illustration3 } from '@/shared/assets/illustration-3'
import { Button } from '@/shared/ui/button'
import { PaginationBlock } from '@/widgets/pagination'

const AllPostsPage = async ({ filters, currentPage }: { filters: IPostFilters; currentPage: number }) => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    if (!token) notFound()

    const { posts, total } = await getPostsByFilters(token.value, currentPage, filters)

    if (posts.length === 0) {
        return (
            <div className="flex flex-col gap-4 w-full justify-center items-center flex-1">
                <Illustration3 className="size-60 fill-primary" />
                <span className="text-lg italic w-64 text-center">
                    No posts found! Either no post match filters or you have not created posts before
                </span>
                <Button asChild size="lg">
                    <Link href={'/new-post'}>
                        <PlusCircleIcon />
                        Create Post
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="h-[95%]">
            <div className="h-full flex flex-col gap-5">
                <PostFilters />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <PostCard
                            key={post.postId}
                            deleteButton={<DeletePostButton postId={post.postId} />}
                            editButton={<EditPostButton post={post} />}
                            isImage={Boolean(post.media[0]?.type?.startsWith('image'))}
                            isVideo={Boolean(post.media[0]?.type?.startsWith('video'))}
                            post={post}
                            primaryMedia={post.media[0]}
                        />
                    ))}
                </div>
                <div className="flex-1 flex items-end justify-center pb-5">
                    <PaginationBlock currentPage={currentPage} totalItems={total} url="/all-posts" />
                </div>
            </div>
        </div>
    )
}

export default AllPostsPage
