import React from 'react'

import { LoaderCircle, PlusCircleIcon } from 'lucide-react'

import { Account, AccountPlatform, PinterestBoardThumbnail, accountsPlatformConfig } from '@/entities/account'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'

import usePinterestPostSettingsService from '../model/use-pinterest-post-settings-service'

interface PinterestPostSettingsProps {
    account: Account
    postText: string
    postTitle: string
    onPostTextChange: (
        text: string,
        accountId: string,
        platform?: AccountPlatform,
        title?: string,
        threadsReplies?: string[]
    ) => void
    selectedBoardId?: string
    onBoardSelect?: (boardId: string) => void
    isDisabled?: boolean
}

const PinterestPostSettings = ({
    account,
    postText,
    postTitle,
    selectedBoardId,
    onPostTextChange,
    onBoardSelect,
    isDisabled = false,
}: PinterestPostSettingsProps) => {
    const { pinterestBoards, handleShowMore, visibleBoards, hasMoreBoards, isBoardsLoading } =
        usePinterestPostSettingsService({
            account,
            selectedBoardId,
        })

    const platform = AccountPlatform.pinterest

    return (
        <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{account.username}</p>

            <div className="flex flex-col gap-2">
                {/* TITLE */}
                <div className="flex flex-col gap-1">
                    <Input
                        disabled={isDisabled}
                        maxLength={accountsPlatformConfig[platform].maxTitle}
                        placeholder="Title (Optional)"
                        value={postTitle}
                        onChange={(e) => onPostTextChange(postText, account.id, platform, e.target.value)}
                    />
                    <div className="text-xs text-muted-foreground text-right">
                        {postTitle.length} / {accountsPlatformConfig[platform].maxTitle} characters
                    </div>
                </div>
                {/* CAPTION */}
                <div className="flex flex-col gap-1">
                    <Textarea
                        className="min-h-54"
                        disabled={isDisabled}
                        maxLength={accountsPlatformConfig[platform].maxCaption}
                        placeholder={`Caption for ${account.username}`}
                        value={postText}
                        onChange={(e) => onPostTextChange(e.target.value, account.id, platform)}
                    />
                    <div className="text-xs text-muted-foreground text-right">
                        {postText.length} / {accountsPlatformConfig[platform].maxCaption} characters
                    </div>
                </div>
                {/* BOARDS */}

                {isBoardsLoading && <LoaderCircle className="size-12 animate-spin text-primary mx-auto" />}

                {pinterestBoards && pinterestBoards.boards.length > 0 && (
                    <>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Select Pinterest Board</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {visibleBoards.map((pinterestBoard) => (
                                <PinterestBoardThumbnail
                                    key={pinterestBoard.id || pinterestBoard.name}
                                    isSelected={pinterestBoard.pinterestBoardId === selectedBoardId}
                                    pinterestBoard={pinterestBoard}
                                    onSelect={onBoardSelect}
                                />
                            ))}
                        </div>
                        {hasMoreBoards && (
                            <Button disabled={isDisabled} variant="outline" onClick={handleShowMore}>
                                <PlusCircleIcon className="w-4 h-4 mr-2" />
                                Show More Boards ({visibleBoards.length} of {pinterestBoards.boards.length})
                            </Button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default PinterestPostSettings
