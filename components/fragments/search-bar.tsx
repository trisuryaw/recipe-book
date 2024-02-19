"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";

export const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(() => new URLSearchParams(searchParams), [searchParams]);

  params.set('search', debouncedValue.toString());
  params.set('pageNumber', '1');

  useEffect(() => {

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedValue, params, pathname, router])

  return (
    <div className="flex h-8 items-center bg-white border rounded-sm px-2 focus-within:ring-1 focus-within:ring-ring transition-all">
      <Search className="w-5 h-5 text-muted-foreground"/>
      <Input 
        className="border-0 h-6 focus-visible:ring-0"
        placeholder="Cari Resep"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}