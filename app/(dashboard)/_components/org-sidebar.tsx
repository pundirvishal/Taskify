"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation"

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export const OrgSidebar = () => {

    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites")

    return (
        <div className="hidden lg:flex flex-col
        space-y-2 w-[206px] pl-5 pt-5">
            <Link href="/">
                <div className="flex items-center gap-x-2">
                    <Image
                    src = "/logo.png"
                    alt="Logo"
                    height={60}
                    width={60}
                    />
                    <span className={cn(
                        "font-semibold text-2xl",
                        font.className,
                    )}>
                        Taskify
                    </span>
                </div>
            </Link>
            <OrganizationSwitcher
            hidePersonal
            appearance={{
                elements: {
                    rootBox: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    },
                    organizationSwitcherTrigger: {
                        padding: "6px",
                        width: "100%",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        justifyContent: "space-between",
                        backgroundColor: "white",
                    }
                }
            }}
            />
            <div className="space-y-1 w-full">
                <Button
                variant={favorites ? "secondary" : "outline"}
                asChild
                size="lg"
                className="font-normal justify-start px-2 w-full"
                >
                    <Link href="/">
                        <LayoutDashboard className="h-4 w-4 mr-2"/>
                        Team Board
                    </Link>
                </Button>
                <Button
                variant={favorites ? "outline" : "secondary"}
                asChild
                size="lg"
                className="font-normal justify-start px-2 w-full"
                >
                    <Link href={{
                        pathname: "/",
                        query: { favorites: true }
                    }}>
                        <Star className="h-4 w-4 mr-2"/>
                        Favorite Board
                    </Link>
                </Button>
            </div>
        </div>
    );
};