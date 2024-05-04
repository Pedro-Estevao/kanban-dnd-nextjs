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
        <div className="kb-column block self-start flex-shrink-0 py-0 px-[6px] h-full whitespace-nowrap mix-blend-mode-unset">
            <div className="relative flex flex-col justify-between bg-[#101204] rounded-[18px] shadow-kbColumn text-[#9fadbc] max-h-full p-0 scroll-m-[8px] whitespace-normal w-[272px] box-border align-top mix-blend-mode-unset transition-column">
                <div className="relative flex items-start justify-between flex-wrap flex-grow-0 gap-y-0 p-[8px] mix-blend-mode-unset">
                    <div className="relative basis-min-content flex-grow flex-shrink min-h-[20px] text-[#b6c2cf] mix-blend-mode-unset">
                        <h2 className="block text-[14px] font-semibold leading-[20px] m-0 py-[6px] px-[12px] bg-transparent overflow-hidden overflow-wrap-anywhere whitespace-normal cursor-pointer mix-blend-mode-unset">{title}</h2>
                    </div>
                </div>
                <Droppable droppableId={`droppable${index}`} type="list" direction="vertical">
                    {(provided) => (
                        <div 
                            className="kb-column__content flex flex-col flex-auto my-0 mx-[4px] pt-0 pb-[10px] px-[5px] h-full overflow-x-hidden overflow-y-auto kb-scrollbar-column mix-blend-mode-unset transition-column"
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
        </div>
    )
};

export default Column;