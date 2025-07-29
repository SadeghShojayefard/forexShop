
"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";
import { DetailModalType } from "@/Type/DetailModalType.type";
import { useEffect, useState } from "react";

const DetailModal: React.FC<DetailModalType> = ({ title, children, action }) => {

    const [open, setOpen] = useState(false);
    const [hasRun, setHasRun] = useState(false); // برای اینکه فقط یک بار اجرا بشه

    useEffect(() => {
        if (open && action && !hasRun) {
            action.action(action.data);
            action.onSuccess();
            setHasRun(true);
        }
    }, [open]);

    return (

        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <button className="formButton">
                    جزئیات
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] max-h-[95vh] overflow-auto bg-white/10 backdrop-blur-sm text-wrap ">
                <DialogHeader className="text-center">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
                <DialogFooter className="mt-2">
                    <DialogClose asChild>
                        <Button type="button" className="bg-red-200 hover:bg-red-400 cursor-pointer" >
                            بستن
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}
export default DetailModal;