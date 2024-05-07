import React, { useState } from "react";
import { ColumnProps } from "@/@types/components";
import Card from "../Card";
import { Droppable, DroppableStateSnapshot } from "@hello-pangea/dnd";
import { Button, CardProps, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { AddIcon, DeleteIcon, MoreIcon } from "../Icons";

const Column = ({
    column,
    lastId,
    index,
    removeColumn
}: ColumnProps) => {
    const addCardModal = useDisclosure();
    const [newCard, setNewCard] = useState<CardProps>({} as CardProps);

    const getListStyle = (snapshot: DroppableStateSnapshot) => {
        if (!snapshot.isDraggingOver) {
            return;
        }

        return {
            transitionDuration: `0.001s`,
        }
    };

    const addCard = () => {
        if (!newCard || !newCard.title) {
            return;
        }

        const newData = Array.from(column.cards);
        const newCardId = `${parseInt(lastId.card) + 1}`;

        newData.push({
            id: newCardId,
            title: newCard.title || "",
            categories: []
        });

        setNewCard({} as CardProps);
        addCardModal.onClose();
    };

    return (
        <div className="kb-column block self-start flex-shrink-0 py-0 px-[6px] h-full whitespace-nowrap mix-blend-mode-unset">
            <div className="relative flex flex-col justify-between bg-[#f4f4f5] dark:bg-[#d4d4d81a] overflow-hidden tap-highlight-transparent outline-none rounded-[18px] text-[#9fadbc] border-none max-h-full p-0 scroll-m-[8px] whitespace-normal w-[272px] box-border align-top mix-blend-mode-unset">
                <div className={`absolute top-0 left-0 right-0 w-full h-[5px] ${column.columnColor}`} />
                <div className="relative flex items-start justify-between flex-wrap flex-grow-0 gap-y-0 p-[8px] pt-[10px] mix-blend-mode-unset">
                    <div className="relative basis-min-content flex items-center justify-between gap-2 flex-grow flex-shrink min-h-[20px] mix-blend-mode-unset">
                        <h2 className="block text-[14px] font-semibold text-black dark:text-default-600 leading-[20px] m-0 py-[6px] px-[12px] bg-transparent overflow-hidden overflow-wrap-anywhere whitespace-normal mix-blend-mode-unset">{column.title}</h2>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                >
                                    <MoreIcon size={16} className="text-stone-500" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                className="max-w-[300px]"
                            >
                                <DropdownItem
                                    description={"All cards from this column will be excluded."}
                                    onClick={() => removeColumn(column.id)}
                                >
                                    <span className="flex items-center gap-2 text-lg text-danger cursor-pointer active:opacity-50">
                                        <DeleteIcon size={18} />
                                        <span className="text-[16px]">Exclude column</span>
                                    </span>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <Droppable droppableId={`droppable${index}`} type="list" direction="vertical">
                    {(provided, snapshot) => (
                        <div
                            className="kb-column__content flex flex-col flex-auto my-0 mx-[4px] py-0 px-[5px] h-full min-h-[10px] overflow-x-auto overflow-y-auto kb-scrollbar-column mix-blend-mode-unset"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                                ...getListStyle(snapshot)
                            }}
                        >
                            {column.cards.map((card, index) => (
                                <Card
                                    key={`${card.id}-${index}`}
                                    card={card}
                                    index={index}
                                // columnProps={provided.droppableProps}
                                // columnSnapshot={snapshot}
                                // columnIndex={index}
                                />
                            ))}

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <div className="flex items-center justify-between gap-x-[4px] p-[8px] mix-blend-mode-unset">
                    <Button
                        className="rounded-[8px] p-[8px] h-fit w-full"
                        variant="light"
                        onPress={addCardModal.onOpen}
                    >
                        <span className="">
                            <span className="">
                                <AddIcon size={16} className="text-default-500" />
                            </span>
                        </span>
                        <span className="text-[14px] text-default-600 dark:text-default-500 leading-[16px]">
                            Add a card
                        </span>
                    </Button>
                    <Modal
                        backdrop="blur"
                        isOpen={addCardModal.isOpen}
                        onOpenChange={addCardModal.onOpenChange}
                        placement="top-center"
                    >
                        <ModalContent>
                            {addCardModal.onClose && (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Add card</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            color="default"
                                            type="text"
                                            label="Card Title"
                                            placeholder="Enter a title for this card..."
                                            variant="flat"
                                            autoComplete="off"
                                        />
                                    </ModalBody>
                                    <ModalFooter className="flex flex-row items-center justify-between w-full">
                                        <Button color="danger" variant="flat" onPress={addCardModal.onClose}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" onPress={addCardModal.onClose}>
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
    )
};

export default Column;