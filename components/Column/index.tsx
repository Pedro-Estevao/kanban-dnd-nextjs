import React from "react";
import { ColumnProps } from "@/@types/components";
import Task from "../Task";
import { Droppable } from "@hello-pangea/dnd";

const Column = ({
    tasks,
    title,
    index
}: ColumnProps) => {
    return (
        <div className="flex flex-col p-5 lg:w-1/3 w-full m-[8px] border-[1px] border-[solid] border-[lightgrey] rounded-[2px]">
            <h2 className="text-center font-bold mb-6">{title}</h2>
            <Droppable droppableId={`droppable${index}`} type="list" direction="vertical">
                {(provided) => (
                    <div 
                        className="h-full overflow-y-auto"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {tasks.map((task, index) => (
                            <Task
                                key={`${task.id}-${index}`}
                                task={task}
                                index={index}
                            />
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
};

export default Column;