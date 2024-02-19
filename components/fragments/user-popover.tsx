"use client";

import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";

export const UserPopover = () => {
  const router = useRouter();
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    router.push("/login");
  }

  return (
    <Popover>
      <PopoverTrigger>
        <FaUserCircle className="text-white hidden lg:block w-7 h-7" />
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  
  )
}