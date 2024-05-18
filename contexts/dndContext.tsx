'use client';

import React from "react";
import { DndContextProps } from "@/@types/contexts";
// import { DndContext as DragDropContext } from "@dnd-kit/core";
import { DragDropContext } from "@hello-pangea/dnd";

const DndContext = ({ children, onDragEnd }: DndContextProps) => {
    return (
        <DragDropContext onDragEnd={onDragEnd} >
            {children}
        </DragDropContext>
    );
};

export default DndContext;
