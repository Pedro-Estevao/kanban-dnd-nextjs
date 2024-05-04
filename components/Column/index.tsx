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
        <div className="block self-start flex-shrink-0 py-0 px-[6px] whitespace-nowrap mix-blend-mode-unset">
            <div className="relative flex flex-col justify-between bg-[#101204] rounded-[12px] shadow-kbColumn text-[#9fadbc] max-h-full pb-[8px] scroll-m-[8px] whitespace-normal w-[272px] box-border align-top mix-blend-mode-unset">
                <div className="relative flex items-start justify-between flex-wrap flex-grow gap-x-0 p-[8px] pb-0 mix-blend-mode-unset">
                    <div className="relative basis-min-content flex-grow flex-shrink min-h-[20px] text-[#b6c2cf] mix-blend-mode-unset">
                        <h2 className="block text-[14px] font-semibold leading-[20px] m-0 py-[6px] pt-[8px] pb-[12px] bg-transparent overflow-hidden overflow-wrap-anywhere whitespace-normal cursor-pointer mix-blend-mode-unset">{title}</h2>
                    </div>
                </div>
                <Droppable droppableId={`droppable${index}`} type="list" direction="vertical">
                    {(provided) => (
                        <div 
                            className="flex flex-col flex-auto gap-x-[8px] my-0 mx-[4px] py-[2px] px-[4px] h-full overflow-x-hidden overflow-y-auto z-[1] kb-scrollbar-column mix-blend-mode-unset"
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