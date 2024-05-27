'use client'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/partsGroups/pagination'
import { usePathname, useSearchParams } from 'next/navigation'

export default function TablePagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 && <PaginationPrevious href={createPageURL(currentPage - 1)} className="bg-gray-400" />}
        </PaginationItem>

        {currentPage - 1 >= 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={createPageURL(currentPage - 1)}>{currentPage - 1}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive href={createPageURL(currentPage)}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink href={createPageURL(currentPage + 1)}>{currentPage + 1}</PaginationLink>
          </PaginationItem>
        )}

        {totalPages - currentPage >= 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={createPageURL(currentPage + 1)} className="bg-gray-400" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
