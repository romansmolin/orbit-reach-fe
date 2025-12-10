import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/shared/ui/pagination'

interface PaginationBlockProps {
    currentPage: number
    totalItems: number
    onClick?: (page: number) => void
    url: string
}

const ITEMS_PER_PAGE = 9

const PaginationBlock: React.FC<PaginationBlockProps> = ({ currentPage, totalItems, url }) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    const paginationArr = Array(totalPages).fill(null)

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className={currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}
                        href={{
                            pathname: url,
                            query: { page: currentPage > 1 ? currentPage - 1 : 1 },
                        }}
                    />
                </PaginationItem>

                {paginationArr.map((page, idx) => (
                    <PaginationItem key={idx}>
                        <PaginationLink
                            isActive={idx + 1 === currentPage}
                            href={{
                                pathname: url,
                                query: { page: idx + 1 },
                            }}
                        >
                            {idx + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext
                        className={currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}
                        href={{
                            pathname: url,
                            query: { page: currentPage < totalPages ? currentPage + 1 : totalPages },
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationBlock
