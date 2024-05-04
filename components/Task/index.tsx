import React from 'react';
import { TaskProps } from "@/@types/components";
import { Draggable } from "@hello-pangea/dnd";
import { Chip } from "@nextui-org/react";
import { GithubIcon } from "../Icons";

const Task = ({
    task,
    index
}: TaskProps) => {
    return (
        <div className="kb-task flex flex-col scroll-m-[80px] mix-blend-mode-unset">
            <Draggable draggableId={task.id.toString()} index={index}>
                {(provided) => (
                    <div
                        className="kb-task__content relative mb-[8px] bg-[#22272b] rounded-[8px] shadow-kbColumn text-[#b6c2cf] cursor-pointer min-h-[36px] scroll-m-[8px] mix-blend-mode-unset"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <div className="relative flow-root pt-[8px] px-[12px] pb-[4px] mix-blend-mode-unset">
                            <div className="flex flex-wrap gap-[4px] mb-[4px] mix-blend-mode-unset">
                                <Chip className="rounded-[8px]" color="secondary">Teste</Chip>
                            </div>
                            <span className="block mb-[4px] overflow-hidden overflow-wrap-break-word whitespace-normal text-[#b6c2cf] no-underline mix-blend-mode-unset">
                                {task.title}
                            </span>
                            <div className="flex flex-wrap float-left gap-x-[4px] max-w-full mix-blend-mode-unset">
                                <GithubIcon />
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        </div>
    );
};

export default Task;