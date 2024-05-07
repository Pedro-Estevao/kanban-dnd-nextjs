'use client';

import React, { useState } from "react";
import { categoriesCard } from "@/bin/initialData";
import { KanbanProps } from "@/@types/components";
import { DropResult } from "@hello-pangea/dnd";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import DndContext from "@/contexts/DnDContext";
import Column from "@/components/Column";

const Kanban = ({ kanbanData }: KanbanProps) => {
    const modalColumn = useDisclosure();
    const [data, setData] = useState<InitialDataProps>(kanbanData);
    const [newColumn, setNewColumn] = useState<InitialDataColumnProps>({} as InitialDataColumnProps);

    const addColumn = () => {
        if (!newColumn || newColumn.title === "") {
            return;
        }

        const newData = Array.from(data.columns);
        const newColumnId = `${parseInt(data.lastId.column) + 1}`;

        newData.push({
            id: newColumnId,
            title: newColumn.title,
            columnColor: newColumn.columnColor,
            cards: []
        });

        setData({ ...data, columns: [...newData], lastId: data.lastId });
        setNewColumn({} as InitialDataColumnProps);
        modalColumn.onClose();
    };

    const removeColumn = (columnId: string) => {
        const newData = Array.from(data.columns);
        const columnIndex = newData.findIndex(x => x.id == columnId);
        newData.splice(columnIndex, 1);

        if (data.lastId.column === columnId) {
            data.lastId.column = `${parseInt(data.lastId.column) - 1}`;
        }

        setData({ ...data, columns: [...newData] });
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId !== destination.droppableId) {
            const newData = Array.from(data.columns);
            const oldDroppableIndex = newData.findIndex(x => x.id == source.droppableId.split("droppable")[1]);
            const newDroppableIndex = newData.findIndex(x => x.id == destination.droppableId.split("droppable")[1])
            const [item] = newData[oldDroppableIndex].cards.splice(source.index, 1);
            newData[newDroppableIndex].cards.splice(destination.index, 0, item);
            setData({ ...data, columns: [...newData] });
        } else {
            const newData = Array.from(data.columns);
            const droppableIndex = newData.findIndex(x => x.id == source.droppableId.split("droppable")[1]);
            const [item] = newData[droppableIndex].cards.splice(source.index, 1);
            newData[droppableIndex].cards.splice(destination.index, 0, item);
            setData({ ...data, columns: [...newData] });
        }
    };

    return (
        <DndContext onDragEnd={onDragEnd}>
            <div className="kb-wrapper absolute top-0 right-0 left-0 bottom-0 flex flex-row mb-[8px] overflow-x-auto overflow-y-hidden pb-[8px] pt-[2px] px-[6px] kb-scrollbar select-none whitespace-nowrap mix-blend-mode-unset">
                {data.columns.map((col, index) => (
                    <Column
                        key={`${col.id}-${index}`}
                        column={col}
                        lastId={data.lastId}
                        index={index}
                        removeColumn={removeColumn}
                    />
                ))}
                <div className="kb-column block self-start flex-shrink-0 py-0 px-[6px] h-full whitespace-nowrap mix-blend-mode-unset">
                    <div className="relative flex flex-col justify-between bg-[#f4f4f5] dark:bg-[#d4d4d81a] overflow-hidden tap-highlight-transparent outline-none rounded-[18px] text-[#9fadbc] border-none max-h-full p-0 scroll-m-[8px] whitespace-normal w-[272px] box-border align-top mix-blend-mode-unset">
                        <Button
                            radius="lg"
                            onPress={modalColumn.onOpen}
                        >
                            Add another list
                        </Button>
                        <Modal
                            backdrop="blur"
                            isOpen={modalColumn.isOpen}
                            onOpenChange={modalColumn.onOpenChange}
                            placement="top-center"
                        >
                            <ModalContent>
                                {modalColumn.onClose && (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Add list</ModalHeader>
                                        <ModalBody>
                                            <Input
                                                color="default"
                                                type="text"
                                                label="List Title"
                                                placeholder="Enter list title..."
                                                variant="flat"
                                                autoComplete="off"
                                                onChange={(e) => setNewColumn({ ...newColumn, title: e.target.value })}
                                            />
                                            <Select
                                                label="Select list color"
                                                // value={newColumn.columnColor}
                                                startContent={<span className={`block w-[15px] min-w-[15px] h-[15px] ${newColumn.columnColor} rounded-[4px]`} />}
                                            >
                                                {categoriesCard.map((category) => (
                                                    <SelectItem 
                                                        key={category.id} 
                                                        value={category.color}
                                                        startContent={<span className={`block w-[15px] min-w-[15px] h-[15px] ${category.color} rounded-[4px]`} />}
                                                        onPress={(e) => {
                                                            const value = e.target.attributes.getNamedItem("value")?.value;
                                                            
                                                            if (value) {
                                                                setNewColumn({ ...newColumn, columnColor: value });
                                                            }
                                                        }}
                                                    >
                                                        {category.nameColor}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </ModalBody>
                                        <ModalFooter className="flex flex-row items-center justify-between w-full">
                                            <Button color="danger" variant="flat" onPress={modalColumn.onClose}>
                                                Cancel
                                            </Button>
                                            <Button
                                                color="primary"
                                                onPress={addColumn}
                                            >
                                                Add
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
            </div>
        </DndContext>
    );
};

export default Kanban;