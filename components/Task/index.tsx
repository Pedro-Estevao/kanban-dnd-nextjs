import React from 'react';
import { TaskProps } from "@/@types/components";
import { Draggable } from "@hello-pangea/dnd";

const Task = ({
    task,
    index
}: TaskProps) => {
    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <div
                    className="bg-white border-[1px] border-[solid] border-[lightgrey] rounded-[2px] p-[8px] mb-[8px] text-black"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    {task.title}
                </div>
            )}
        </Draggable>
    );
};

export default Task;