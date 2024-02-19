"use client";

import { X, SquareEqual, Star } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useUser } from "@/hooks/use-user";

export const Sidebar = () => {
  const sidebar = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useUser();

  const routes = [
    {
      title: "Daftar Resep Makanan",
      href: "/book-recipes",
      active: pathname === "/book-recipes",
      icon: <SquareEqual className="w-5 h-5" />
    },
    {
      title: "Resep Saya",
      href: "/my-recipes",
      active: pathname === "/my-recipes",
      icon: <FaHeartCirclePlus className="w-5 h-5" />
    },
    {
      title: "Resep Favorit",
      href: "/favorite-recipes",
      active: pathname === "/favorite-recipes",
      icon: <Star className="w-5 h-5" />
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/login");
    sidebar.onClose()
  }

  return (
    <>
      <div className={cn("fixed top-0 right-0 w-4/6 bg-primary h-full transition-all duration-300 z-[999]", !sidebar.isOpen && "right-[-100%]")}>
        <Button
          className="absolute right-2 top-2 hover:bg-primary"
          variant="ghost"
          onClick={() => sidebar.onClose()}
        >
          <X className="w-7 h-7 text-white" /> 
        </Button>
        <div className="pt-16 px-4 flex flex-col gap-3 text-white">
          {routes.map(route => (
            <Link 
              href={route.href}
              key={route.href}
              className={cn("flex items-center justify-start gap-2 hover:text-secondary transition font-semibold", route.active && "text-secondary")}
              onClick={() => sidebar.onClose()}
            >
              {route.icon}
              <p>
                {route.title}
              </p>
            </Link>
          ))}
          <div 
            className="flex items-center justify-start gap-2 hover:text-secondary transition cursor-pointer"
            onClick={handleLogout}
          >
            <TbLogout2 className="w-5 h-5" />
            <p className="font-semibold">
              Sign Out
            </p>
          </div>
        </div>
      </div>
      <div 
        className={cn("fixed top-0 left-0 w-full bg-transparent/30 h-full z-[99]", !sidebar.isOpen && "left-[-100%]")}
        onClick={() => sidebar.onClose()}
      />
    </>
  )
}