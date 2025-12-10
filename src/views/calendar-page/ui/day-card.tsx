import { format } from 'date-fns'
import { View } from 'lucide-react'

import { IPost, PostMinimalisticCards } from '@/entities/post'
import { AddNewPostButton } from '@/features/post/create-post'
import { EditPostWrapper } from '@/features/post/edit-post'
import { ShowPostsDialog } from '@/features/post/show-posts'
import { GenericCard } from '@/shared/components/generic-card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

interface DayCardProps {
    day: Date
    dayPosts: IPost[]
    hasMorePosts: boolean
    dayIsToday: boolean
    maxPostsToShow: number
    selectedDayPosts: IPost[] | null
    setSelectedDayPosts: React.Dispatch<React.SetStateAction<IPost[] | null>>
}

export const DayCard = ({
    day,
    dayIsToday,
    dayPosts,
    hasMorePosts,
    maxPostsToShow,
    selectedDayPosts,
    setSelectedDayPosts,
}: DayCardProps) => {
    const dayCardHeader = (
        <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1">
                <span className="text-base font-semibold">{format(day, 'EEEE')}</span>
                <span className="text-sm text-muted-foreground">{format(day, 'MMM dd')}</span>
            </div>
            <div className="flex flex-col items-end gap-1">
                {dayIsToday && (
                    <Badge className="text-[11px] uppercase" variant="secondary">
                        Today
                    </Badge>
                )}
                <span className="text-xs text-muted-foreground">{dayPosts.length} scheduled</span>
            </div>
        </div>
    )

    const dayCardContent = (
        <div className="space-y-3">
            {dayPosts.length > 0 ? (
                <div className="flex flex-col gap-2">
                    {dayPosts.slice(0, maxPostsToShow).map((post) => (
                        <EditPostWrapper key={post.postId} post={post}>
                            <PostMinimalisticCards post={post} />
                        </EditPostWrapper>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">No posts scheduled</p>
            )}

            <div className="flex flex-wrap gap-2">
                <AddNewPostButton
                    buttonProps={{
                        className: 'flex-1 justify-center',
                        size: 'lg',
                        variant: 'outline',
                    }}
                    selectedDate={day}
                />

                {hasMorePosts && (
                    <ShowPostsDialog
                        dialogHeaderTitle={`All posts for ${format(day, 'PPP')}`}
                        posts={selectedDayPosts || dayPosts}
                        triggerButton={
                            <Button
                                className="flex-1 justify-center"
                                size="lg"
                                onClick={() => setSelectedDayPosts(dayPosts)}
                            >
                                <View className="size-4" />
                                View {dayPosts.length} posts
                            </Button>
                        }
                    />
                )}
            </div>
        </div>
    )

    return (
        <GenericCard cardContainerClassName="shadow-sm" cardContent={dayCardContent} cardHeader={dayCardHeader} />
    )
}
