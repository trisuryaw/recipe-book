"use client";

import { ListFilter } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PopoverClose } from "@radix-ui/react-popover";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterSchema } from "@/lib/schemas";
import { useDialog } from "@/hooks/use-dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getDataMasters } from "@/lib/api";
import { categoryProps, levelProps } from "@/lib/interfaces";

export const Filter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
  });
  const urlCategories = process.env.NEXT_PUBLIC_API_MASTER_CATEGORIES as string;
  const urlLevels = process.env.NEXT_PUBLIC_API_MASTER_LEVELS as string;

  const [categories, setCategories] = useState<categoryProps[]>();
  const [levels, setLevels] = useState<levelProps[]>();

  const fetchDataCategories = useCallback(async () => {
    try {
      const response = await getDataMasters(urlCategories);

      setCategories(response.data.data);
    } catch (error) {
      throw error;
    }
  }, [urlCategories, setCategories]);

  const fetchDataLevels = useCallback(async () => {
    try {
      const response = await getDataMasters(urlLevels);

      setLevels(response.data.data);
    } catch (error) {
      throw error;
    }
  }, [urlLevels, setLevels]);

  useEffect(() => {
    fetchDataCategories();
    fetchDataLevels();
  }, [fetchDataCategories, fetchDataLevels])

  const dialog = useDialog();

  const params = new URLSearchParams(searchParams);

  function onSubmit(data: z.infer<typeof filterSchema>) {
    data.difficulty && params.set('difficulty', data.difficulty || '');
    data.category && params.set('category', data.category || '');
    data.time && params.set('time', data.time || '');
    data.sort && params.set('sort', data.sort || '');

    dialog.type = "success";
    dialog.message = "Filter berhasil ditambahkan"
    dialog.onOpen();
    router.push(`${pathname}?${params}`);
  }

  const clearFilter = () => {
    form.setValue("difficulty", "");
    form.setValue("category", "");
    form.setValue("time", "");
    form.setValue("sort", "");

    params.has('difficulty') && params.delete('difficulty');
    params.has('category') && params.delete('category');
    params.has('time') && params.delete('time');
    params.has('sort') && params.delete('sort');

    router.push(`${pathname}?${params}`);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost"
          className="bg-white hover:bg-white hover:text-secondary text-black w-full flex justify-between items-center transition rounded-sm h-8">
          Filter
          <ListFilter className="w-5 h-5"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 lg:w-96">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2 lg:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-2">
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem className="lg:col-span-1">
                  <FormLabel>Tingkat Kesulitan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tingkat kesulitan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {levels?.map((level) =>
                        <SelectItem key={level.levelId} value={level.levelId.toString()}>{level.levelName}</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="lg:col-span-1">
                  <FormLabel>Kategori</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) =>
                        <SelectItem key={category.categoryId} value={category.categoryId.toString()}>{category.categoryName}</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="lg:col-span-1">
                  <FormLabel>Waktu Memasak</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih waktu memasak" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0-30">0-30 Menit</SelectItem>
                      <SelectItem value="30-60">30-60 Menit</SelectItem>
                      <SelectItem value="60">60-90 Menit</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sort"
              render={({ field }) => (
                <FormItem className="hidden lg:block lg:col-span-1">
                  <FormLabel>Sortir</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih sortir" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="recipeName,asc">Nama Resep A-Z</SelectItem>
                      <SelectItem value="recipeName,desc">Nama Resep Z-A</SelectItem>
                      <SelectItem value="timeCook,asc">Waktu Memasak A-Z</SelectItem>
                      <SelectItem value="timeCook,desc">Waktu Memasak Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="text-destructive text-sm hover:cursor-pointer" onClick={clearFilter}>
              Bersihkan filter
            </div>
            <div className="flex justify-between">
              <PopoverClose asChild>
                <Button type="button" variant="secondary">Batal</Button>
              </PopoverClose>
              <PopoverClose asChild>
                <Button type="submit">Submit</Button>
              </PopoverClose>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}