'use client'

import React from 'react'

import { NotebookText, VideoIcon } from 'lucide-react'

import { PostPreview, PostProvider } from '@/features/post/create-post'
import { MediaPostForm, TextPostForm } from '@/features/post/create-post'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

const NewPostPage = ({ copyData, initialTimezone }: { copyData?: string; initialTimezone?: string }) => {
    return (
        <PostProvider copyData={copyData} initialTimezone={initialTimezone}>
            <div className="flex h-full relative">
                <div className="flex flex-col gap-4 md:flex-row md:gap-2 h-full flex-1 items-start">
                    <div className="rounded-md flex-2">
                        <Tabs className="w-full flex flex-col gap-4 h-full" defaultValue="media">
                            <TabsList className="w-full">
                                <TabsTrigger className="flex items-center gap-2" value="media">
                                    <VideoIcon />
                                    Media Post
                                </TabsTrigger>
                                <TabsTrigger className="flex items-center gap-2" value="text">
                                    <NotebookText />
                                    Text Post
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="media">
                                <MediaPostForm copyData={copyData} />
                            </TabsContent>

                            <TabsContent value="text">
                                <TextPostForm copyData={copyData} />
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="flex-1 w-full  flex h-full">
                        <PostPreview />
                    </div>
                </div>
            </div>
        </PostProvider>
    )
}

export default NewPostPage
