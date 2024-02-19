"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";

export const Entries = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [currentEntries, setCurrentEntries] = useState<number>(Number(searchParams.get('pageSize')) || 8);
    const router = useRouter();
    const entries:number[] = [8, 16, 32];

    const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
    params.set('pageSize', currentEntries.toString());

    useEffect(() => {
        router.push(`${pathname}?${params.toString()}`);
    }, [currentEntries, params, pathname, router]);

    return(
        <div className="flex justify-center items-center gap-1">
            <span className="text-gray-600">Entries</span>
            {entries.map((entry) => 
                <Button
                    key={entry}
                    className="hover:bg-secondary hover:text-white text-secondary bg-transparent rounded-full disabled:rounded-md disabled:bg-secondary disabled:text-white" 
                    size="icon"
                    onClick={() => setCurrentEntries(entry)}
                    disabled={currentEntries == entry}
                >
                    {entry}
                </Button>
            )}
        </div>
    )
}