"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Footer } from "./footer";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "../hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean;
}

export const BoardCard = ({
    id,
    title,
    authorName,
    authorId,
    createdAt,
    imageUrl,
    orgId,
    isFavorite,
}: BoardCardProps) => {

    const { 
        mutate: onFavorite,
        pending: pendingFavorite,
    } = useApiMutation(api.board.favorite);
     const { 
        mutate: onUnFavorite,
        pending: pendingUnFavorite,
    } = useApiMutation(api.board.unfavorite);
    
    const toggleFavorite = () => {
        if (isFavorite) {
            onUnFavorite({ id })
                .catch(() => toast.error("Failed to unfavorite"))
        } else {
            onFavorite({ id, orgId })
            .catch(() => toast.error("Failed to favorite"))
        }
    };

    const { userId } = useAuth();
    const authorLabel = userId == authorId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });

    return(
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg
            flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Image
                    src={imageUrl}
                    alt="Doodle"
                    fill
                    className="object-fit"
                    />
                    <Overlay/>
                    <Actions
                    id={id}
                    title={title}
                    side="right"
                    >
                        <button 
                        className="absolute top-1 right-1 opacity-0
                        group-hover:opacity-100 transition-opacity px-3
                        py-2 outline-none">
                            <MoreHorizontal className="text-white opacity-75
                            hover:opacity-100 transition-opacity"/>
                        </button>
                    </Actions>
                </div>
                <Footer
                isFavorite={isFavorite}
                title={title}
                authorLabel={authorLabel}
                createdAtLabel={createdAtLabel}
                onClick={toggleFavorite}
                disabled={pendingFavorite || pendingUnFavorite}
                />
            </div>
        </Link>
    );
};