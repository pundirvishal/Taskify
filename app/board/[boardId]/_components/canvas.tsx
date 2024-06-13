"use client";

import { useState } from "react";

import { CanvasMode, CanvasState } from "@/types/canvas";

import { Info } from "./info";
import { Participants } from "./participants";
import { ToolBar } from "./toolbar";
import { useCanRedo, useCanUndo, useHistory } from "@/liveblocks.config";

interface CanvasProps {
    boardId: string;
};

export const Canvas = ({
    boardId,
}: CanvasProps) => {

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    })

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();
    
    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId} />
            <Participants />
            <ToolBar 
            canvasState={canvasState}
            setCanvasState={setCanvasState}
            canRedo={canRedo}
            canUndo={canUndo}
            undo={history.undo}
            redo={history.redo}
            />
        </main>
    );
};