"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SortBy = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(() =>  new URLSearchParams(searchParams), [searchParams]);

  const [selected, setSelected] = useState("recipeName,asc");
 

  useEffect(() => {
    params.set('sort', selected);

    router.push(`${pathname}?${params.toString()}`);
  }, [params, pathname, router, selected])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost"
          className="bg-white hover:bg-white hover:text-secondary text-black w-full flex justify-between items-center transition rounded-sm">
          Sort by
          <ChevronDown className="w-5 h-5"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Button 
          className={cn("bg-transparent hover:bg-transparent hover:text-secondary text-black w-full", 
            selected === "recipeName,asc" && "text-secondary"
          )}
          onClick={() => setSelected("recipeName,asc")}
        >
          Nama Resep A-Z
        </Button>
        <Button 
          className={cn("bg-transparent hover:bg-transparent hover:text-secondary text-black w-full", 
            selected === "recipeName,desc" && "text-secondary"
          )}
          onClick={() => setSelected("recipeName,desc")}
        >
          Nama Resep Z-A
        </Button>
        <Button 
          className={cn("bg-transparent hover:bg-transparent hover:text-secondary text-black w-full", 
            selected === "timeCook,asc" && "text-secondary"
          )}
          onClick={() => setSelected("timeCook,asc")}
        >
          Waktu Memasak A-Z
        </Button>
        <Button 
          className={cn("bg-transparent hover:bg-transparent hover:text-secondary text-black w-full", 
            selected === "timeCook,desc" && "text-secondary"
          )}
          onClick={() => setSelected("timeCook,desc")}
        >
          Waktu Memasak Z-A
        </Button>
        
      </PopoverContent>
    </Popover>
  )
}