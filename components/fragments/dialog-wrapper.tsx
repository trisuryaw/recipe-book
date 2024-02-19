"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialog } from "@/hooks/use-dialog";
import { Button } from "@/components/ui/button";
import axiosInterceptorInstance from "@/lib/apiConfig";
import {useMyRecipes} from "@/hooks/use-my-recipes";
import {useUser} from "@/hooks/use-user";

export const DialogWrapper = () => {
  const { userId } = useUser();
  const dialog = useDialog();
  const myRecipes = useMyRecipes()
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleConfirm = () => {
    let recipeId = dialog.recipeId
    axiosInterceptorInstance.put(`https://mt-springboot.cloudias79.com/api/book-recipe/book-recipes/${recipeId}?userId=${userId}`)
        .then(res => {
          dialog.type = "success";
          dialog.message = res.data.message;
          dialog.onOpen();
          myRecipes.remove(parseInt(recipeId))
        })
        .catch(error => console.error(error))
  }

  return (
    <Dialog open={dialog.isOpen} onOpenChange={dialog.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {dialog.type === "success" ? (
              <div className="text-lg font-bold text-[#00e696] flex flex-col items-center">
                <Image
                  src="/success-dialog.svg"
                  alt="Success"
                  width={50}
                  height={50}
                />
                <p>
                  Sukses
                </p>
              </div>
            ): (
              <div className="flex justify-center">
                <Image 
                  src="/info-dialog.svg"
                  alt="Info"
                  width={50}
                  height={50}
                />
              </div>
            )}
          </DialogTitle>
          <DialogDescription>
            {/* TODO: Command yang berhasil dijalankan */}
            {dialog.message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {dialog.type === "success" ? (
            <div className="w-full flex justify-center">
              <DialogClose asChild>
                <Button type="button">
                  Continue
                </Button>
              </DialogClose>
            </div>
          ): (
            <div className="flex justify-between items-center gap-9 w-full">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="w-3/4">
                  Tidak
                </Button>
              </DialogClose>
              <Button onClick={handleConfirm} className="w-3/4">
                Ya
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}