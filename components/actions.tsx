"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";


import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/app/(dashboard)/_components/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use_rename_modal";


interface ActionProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
};

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title,
}: ActionProps) => {
    const { onOpen} = useRenameModal();
    const { mutate, pending } = useApiMutation(api.board.remove);

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        )
        .then(() => toast.success("Link Copied"))
        .catch(() => toast.error("Failed to copy the link"))
    };

    const onDelete = () => {
        mutate({ id })
        .then(() => toast.success("Board deleted!"))
        .catch(() => toast.error("Failed to delete board"))
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
            onClick={(e) => e.stopPropagation()}
            side={side}
            sideOffset={sideOffset}
            className="w-60"
            >
                <DropdownMenuItem
                onClick={onCopyLink}
                className="p-3 cursor-pointer"
                >
                    <Link2
                    className="h-4 w-4 mr-2"
                    />
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem
                onClick={() => onOpen(id, title)}
                className="p-3 cursor-pointer"
                >
                    <Pencil
                    className="h-4 w-4 mr-2"
                    />
                    Rename board
                </DropdownMenuItem>
                <ConfirmModal
                header="Delete Board?"
                description="This will delete board and all of its content."
                disabled={pending}
                onConfirm={onDelete}
                >
                    <Button
                    //onClick={onDelete}
                    variant="ghost"
                    className="p-3 cursor-pointer text-sm w-full
                    justify-start font-normal"
                    >
                        <Trash2
                        className="h-4 w-4 mr-2"
                        />
                        Delete board
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};