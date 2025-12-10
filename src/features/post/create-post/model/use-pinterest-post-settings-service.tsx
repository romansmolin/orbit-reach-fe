import { useCallback, useMemo, useRef, useState } from 'react'

import { Account, useGetPinterestBoardsByAccountIdQuery } from '@/entities/account'
import { useIsMobile } from '@/shared/lib/react/use-mobile'

interface UsePinterestSettingsProps {
    account: Account
    selectedBoardId?: string
}

const MAX_TO_SHOW_ON_MOBILE = 5
const MAX_TO_SHOW_ON_DESKTOP = 10

export const usePinterestSettings = ({ account, selectedBoardId }: UsePinterestSettingsProps) => {
    const { data: pinterestBoards, isLoading } = useGetPinterestBoardsByAccountIdQuery(account.id)
    const isMobile = useIsMobile()
    const visibleCountRef = useRef(isMobile ? MAX_TO_SHOW_ON_MOBILE : MAX_TO_SHOW_ON_DESKTOP)
    const [updateTrigger, setUpdateTrigger] = useState(0)

    const handleShowMore = useCallback(() => {
        if (pinterestBoards?.boards && visibleCountRef.current) {
            visibleCountRef.current = Math.min(
                visibleCountRef.current + MAX_TO_SHOW_ON_MOBILE,
                pinterestBoards.boards.length
            )

            // Force re-render by updating state
            setUpdateTrigger((prev) => prev + 1)
        }
    }, [pinterestBoards?.boards])

    const visibleBoards = useMemo(() => {
        return pinterestBoards?.boards?.slice(0, visibleCountRef.current) || []
    }, [pinterestBoards?.boards, updateTrigger])

    const hasMoreBoards = useMemo(() => {
        return pinterestBoards?.boards && visibleCountRef.current < pinterestBoards.boards.length
    }, [pinterestBoards?.boards, updateTrigger])

    const selectedBoard = useMemo(() => {
        return pinterestBoards?.boards?.find((board) => board.pinterestBoardId === selectedBoardId)
    }, [pinterestBoards?.boards, selectedBoardId])

    return {
        hasMoreBoards,
        visibleBoards,
        handleShowMore,
        pinterestBoards,
        selectedBoard,
        selectedBoardId,
        isBoardsLoading: isLoading,
    }
}

// Legacy export for backward compatibility
export default usePinterestSettings
