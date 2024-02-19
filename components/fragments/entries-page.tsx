import { EntriesPageProps } from "@/lib/interfaces"
import { Entries } from "./entries"
import { Pagination } from "./pagination"

export const EntriesPage = ({totalPages = 1}: EntriesPageProps) => {
    return(
        <>
            <div className="grid grid-cols-2 gap-4 mt-2 lg:hidden">
                <div className="col-span-1">
                    <Entries />
                </div>
                <div className="col-span-1">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
            <div className="hidden grid-cols-4 gap-2 mt-2 lg:grid">
                <div className="col-span-1">
                    <Entries />
                </div>
                <div className="col-auto col-end-5">
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </>
    )
}