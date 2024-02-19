"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft } from "lucide-react";

import { ControlBar } from "@/components/custom/control-bar";
import { Button } from "@/components/ui/button";
import { HeaderProps } from "@/lib/interfaces";

export const Header = ({
  showControlBar = false,
  showBackButton = false,
  title
}: HeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 my-5 ">
      <div className="hidden lg:block">
        {showControlBar && (
          <ControlBar />
        )}
      </div>
      {showBackButton && (
        <Button
          variant="link"
          onClick={() => router.back()}
          className="text-black hover:text-secondary hover:no-underline px-0 w-fit flex justify-start items-center md:hidden"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Kembali
        </Button>
      )}
      <div className="flex items-center justify-center font-bold text-lg lg:text-3xl text-center my-2 relative w-full">
        {showBackButton && (
          <ChevronLeft 
            className="w-5 h-5 lg:w-6 lg:h-6 hidden md:block md:absolute left-0 text-black"
            onClick={() => router.back()}
          />
        )}
        {title}
      </div>
      <div className="visible lg:hidden">
        {showControlBar && (
          <ControlBar />
        )}
      </div>
    </div>
  )
}