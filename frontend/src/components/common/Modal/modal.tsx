import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area";

import { ReactNode } from "react";

type UseModalOptions = {
  size?: "sm" | "md" | "lg" | "full";
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
};

type ModalProps = UseModalOptions & {
  isOpen: boolean
  close: () => void
}

export function Modal({
  isOpen,
  close,
  size = "md",
  title,
  children,
  footer,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className={` w-full max-w-${size === "sm" ? "1/3" : size === "md" ? "1/2" : size === "lg" ? "2/3" : size === "full" ? "full" : "1/2"} rounded-lg bg-white dark:bg-darkgray p-6 shadow-md dark:dark-shadow-md`}
      >
        <ScrollArea className="max-h-[90vh]">
          <div className="pt-3">

            {title && (
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
            )}
            <div className="my-5">
              {children}
            </div>
            {footer &&
              <DialogFooter>
                {footer}
              </DialogFooter>
            }
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
