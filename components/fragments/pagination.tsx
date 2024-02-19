"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { PaginationProps } from "@/lib/interfaces";

export const Pagination = ({
  totalPages
}: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('pageNumber')) || 1);
  const router = useRouter();
  
  const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
  params.set('pageNumber', currentPage.toString());

  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPages) setCurrentPage(1);
    if(params.has('pageNumber') && params.get('pageNumber') == '1') setCurrentPage(1);

    router.push(`${pathname}?${params.toString()}`);
  }, [currentPage, params, pathname, router, totalPages]);

  if (totalPages < 2) return null;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pages = [];
  const loopedPages = (start:number, end:number) => {
    for(let i=start; i < end; i++){
      pages.push(
        <Button
          key={`page-${i}`}
          className="hover:bg-secondary hover:text-white text-secondary bg-transparent rounded-full disabled:rounded-full disabled:bg-secondary disabled:text-white" 
          size="icon"
          onClick={() => handlePageChange(i)}
          disabled={currentPage == i}
        >
          {i}
        </Button>
      )
    }
  }

  if (totalPages < 6) {
    loopedPages(1, totalPages);
  } else {
    if(currentPage < 6){
      loopedPages(1, 6);
      pages.push(<span key={'page-divider'} className="text-secondary">...</span>)
    } else if(currentPage >= 6 && currentPage < totalPages -2){
      pages.push(<span key={'page-divider-1'} className="text-secondary">...</span>)
      loopedPages(currentPage - 1, currentPage + 2);
      pages.push(<span key={'page-divider-2'} className="text-secondary">...</span>)
    } else {
      pages.push(<span key={'page-divider'} className="text-secondary">...</span>)
      loopedPages(totalPages - 4, totalPages);
    }
  }

  if(!totalPages) return <></>

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        className="hover:bg-secondary hover:text-white text-secondary bg-transparent rounded-full" 
        size="icon"
        onClick={() => {
          const newPage = currentPage - 1;
          handlePageChange(newPage);
        }}
        disabled={currentPage < 2}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {currentPage >= 6 && 
        <Button 
          className="hover:bg-secondary hover:text-white text-secondary bg-transparent rounded-full disabled:rounded-full disabled:bg-secondary disabled:text-white" 
          size="icon"
          onClick={() => handlePageChange(1)}
          disabled={currentPage == 1}
        >
          {1}
        </Button>
      }
      {pages}
      <Button 
        className="hover:bg-secondary hover:text-white text-secondary bg-transparent rounded-full disabled:rounded-full disabled:bg-secondary disabled:text-white" 
        size="icon"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage == totalPages}
      >
        {totalPages}
      </Button>
      <Button 
        className="hover:bg-secondary hover:text-white text-secondary bg-transparent rounded-full" 
        size="icon"
        onClick={() => {
          const newPage = currentPage + 1;
          handlePageChange(newPage);
        }}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}