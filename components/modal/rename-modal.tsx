"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/use_rename_modal";
import { Input } from "@/components/ui/input";
import { FormEventHandler, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/app/(dashboard)/_components/hooks/use-api-mutation";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";

export const RenameModal = () => {

    const { mutate, pending } = useApiMutation(api.board.update);

    const {
        isOpen,
        onClose,
        initialValues,
    } = useRenameModal();


    const [title, setTitle] = useState(initialValues.title);


    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (
        e,
    ) => {
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title,
        })
        .then(() => {
            toast.success("Board Renamed");
            onClose();
        })
        .catch(() => toast.error("Failed to rename the board"));
    };
    
    return (
        <Dialog
        open={isOpen} onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                    disabled={pending}
                    required
                    maxLength={60}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Board title"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                            type="button"
                            variant="outline"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                        type="submit"
                        disabled={pending}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};