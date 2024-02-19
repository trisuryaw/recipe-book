import {Plus} from "lucide-react";

import {Filter} from "@/components/custom/filter";
import {SearchBar} from "@/components/custom/search-bar";
import {SortBy} from "@/components/custom/sort-by";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export const ControlBar = () => {
    return (
        <>
            <div className="grid grid-cols-2 gap-2 gap-x-2 lg:hidden">
                <div className="col-span-2">
                    <SearchBar/>
                </div>
                <div className="col-span-1">
                    <Filter/>
                </div>
                <div className="col-span-1">
                    <SortBy/>
                </div>
                <Button className="col-span-2">
                    <Plus/>Tambah Resep
                </Button>
            </div>
            <div className="hidden lg:grid grid-cols-5 gap-2 gap-x-8 px-20">
                <Link href="/recipe/create">
                    <Button className="w-full h-8">
                        <Plus/>Tambah Resep
                    </Button>
                </Link>
                <div className="col-span-3">
                    <SearchBar/>
                </div>
                <div className="col-span-1">
                    <Filter/>
                </div>
            </div>
        </>
    )
}