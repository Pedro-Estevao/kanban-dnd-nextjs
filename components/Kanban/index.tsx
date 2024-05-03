'use client';

import React, { useState } from "react";
import { KanbanProps } from "@/@types/components";
import DndContext from "@/contexts/DnDContext";
import { DropResult } from "@hello-pangea/dnd";
import Column from "@/components/Column";

const Kanban = ({ kanbanData }: KanbanProps) => {
    const [data, setData] = useState<InitialDataProps[] | []>(kanbanData);

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId !== destination.droppableId) {
            const newData = Array.from(data);
            const oldDroppableIndex = newData.findIndex(x => x.id == source.droppableId.split("droppable")[1]);
            const newDroppableIndex = newData.findIndex(x => x.id == destination.droppableId.split("droppable")[1])
            const [item] = newData[oldDroppableIndex].tasks.splice(source.index, 1);
            newData[newDroppableIndex].tasks.splice(destination.index, 0, item);
            setData([...newData]);
        } else {
            const newData = Array.from(data);
            const droppableIndex = newData.findIndex(x => x.id == source.droppableId.split("droppable")[1]);
            const [item] = newData[droppableIndex].tasks.splice(source.index, 1);
            newData[droppableIndex].tasks.splice(destination.index, 0, item);
            setData([...newData]);
        }
    };

    return (
        <DndContext onDragEnd={onDragEnd}>
			<h1 className="text-center mt-8 mb-3 font-bold text-[25px] ">Drag and Drop Application</h1>
			<div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
				{data.map((col, index) => (
					<Column
						key={`${col.id}-${index}`}
						tasks={col.tasks}
						title={col.title}
						index={index}
					/>
				))}
			</div>
		</DndContext>
    );
};

export default Kanban;