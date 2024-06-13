"use client";

import { memo } from "react";

import { useOther, useOthersConnectionIds } from "@/liveblocks.config";
import { Cursor } from "./cursor";

const Cursors = () => {
    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((connectionId) => (
                <Cursor
                key={connectionId}
                connectionId={connectionId}
                />
            ))}
        </>
    );
};

export const CursorPresence = memo(() => {
    return (
        <>
            <Cursors />
        </>
    );
});