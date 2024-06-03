"use client"

import { usePathname, useSearchParams } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect } from "react"

const PaginationComponent = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  function createPageArray(currentPage: number, totalPages: number): number[] {
    const pageArray: number[] = []
    const delta = 2 // We want a total of 5 pages, so 2 pages before and 2 pages after the current page

    let start = Math.max(1, currentPage - delta)
    let end = Math.min(totalPages, currentPage + delta)

    // Adjust the range if we're near the start or end
    if (currentPage - start < delta) {
      end = Math.min(totalPages, end + (delta - (currentPage - start)))
    }
    if (end - currentPage < delta) {
      start = Math.max(1, start - (delta - (end - currentPage)))
    }

    for (let i = start; i <= end; i++) {
      pageArray.push(i)
    }

    return pageArray
  }

  const pageNavs = createPageArray(currentPage, totalPages)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [searchParams])

  return (
    <Pagination>
      <PaginationContent className="w-full">
        <PaginationItem className="flex-1">
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            isActive={currentPage > 1}
          />
        </PaginationItem>
        {pageNavs[0] !== 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pageNavs.map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              href={createPageURL(page)}
              isActive={page !== currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {pageNavs[pageNavs.length - 1] !== totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem className="flex-1 flex justify-end">
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            isActive={currentPage < totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
export default PaginationComponent
