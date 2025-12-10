import React from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'

import { cn } from '@/shared/lib/utils'

import { PinterestAccountBoard } from '../model/account.interface'

interface PinterestBoardThumbnailProps {
    pinterestBoard: PinterestAccountBoard
    isSelected: boolean
    onSelect?: (boardId: string) => void
}

const PinterestBoardThumbnail: React.FC<PinterestBoardThumbnailProps> = ({
    pinterestBoard,
    isSelected,
    onSelect,
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={cn(
                            'cursor-pointer rounded-md border transition-all duration-200 p-2',
                            isSelected && 'border-emerald-200'
                        )}
                        onClick={() => onSelect?.(pinterestBoard.pinterestBoardId)}
                    >
                        <div className="flex items-center justify-between">
                            <p className="truncate max-w-[150px]">{pinterestBoard.name}</p>
                            <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${
                                    pinterestBoard.privacy === 'PUBLIC'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                {pinterestBoard.privacy.toLowerCase()}
                            </span>
                        </div>
                    </div>
                </TooltipTrigger>

                <TooltipContent className="hidden md:block p-0 border-0 bg-transparent shadow-none" side="right">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                        <div className="w-48 h-36 bg-gray-100 relative">
                            <img
                                alt={pinterestBoard.name}
                                src={pinterestBoard.thumbnailUrl || '/placeholder.svg'}
                                className={`w-full h-full object-cover transition-opacity duration-300 ${
                                    pinterestBoard ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default PinterestBoardThumbnail
