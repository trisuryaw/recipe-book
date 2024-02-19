"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { UserPopover } from "@/components/custom/user-popover";

export const Navbar = () => {
  const sidebar = useSidebar();
  const pathname = usePathname();

  const routes = [
    {
      title: "Daftar Resep Makanan",
      href: "/book-recipes",
      active: pathname === "/book-recipes",
    },
    {
      title: "Resep Saya",
      href: "/my-recipes",
      active: pathname === "/my-recipes",
    },
    {
      title: "Resep Favorit",
      href: "/favorite-recipes",
      active: pathname === "/favorite-recipes",
    },
  ]

  return (
    <div className="z-[99] bg-primary flex justify-between items-center py-2 fixed top-0 left-0 w-full px-2 md:px-10 lg:pr-20 xl:pr-40">
      <div className="flex justify-between items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={35}
          height={35}
        />
        <p className="text-base font-bold text-white">Buku Resep 79</p>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="hover:bg-primary lg:hidden flex items-center justify-end"
        onClick={sidebar.onOpen}
      >
        <Menu className="h-5 w-5 text-white" />
      </Button>
      <div className="hidden lg:flex gap-16 items-center">
        {routes.map(route => (
          <Link 
            href={route.href}
            key={route.href}
            className={cn("flex items-center justify-start gap-2 hover:text-secondary transition font-bold text-white text-sm", route.active && "text-secondary")}
          >
            <p className="">
              {route.title}
            </p>
          </Link>
        ))}
        <UserPopover />
      </div>
    </div>
  )
};