import { Fragment, memo, ReactNode, useEffect, useRef, useState } from "react";

import invariant from "tiny-invariant";

import { standard } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/behavior/standard";
import { unsafeOverflow } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/behavior/unsafe-overflow";
import { autoScrollForElements } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/element";
import { autoScrollForFiles } from "@atlaskit/pragmatic-drag-and-drop-auto-scroll/file";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/util/combine";

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { categoriesCard } from "@/bin/initialData";

const Board = ({ children }: { children: ReactNode }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const modalColumn = useDisclosure();
    const [newColumn, setNewColumn] = useState<InitialDataColumnProps>({} as InitialDataColumnProps);

    useEffect(() => {
        invariant(ref.current)
        return combine(
            autoScrollForElements({
                element: ref.current,
                behavior: [
                    // standard(),
                    unsafeOverflow({
                        getHitboxSpacing: () => ({
                            top: {
                                top: 6000,
                                right: 6000,
                                bottom: 220,
                                left: 6000
                            },
                            right: {
                                top: 6000,
                                right: 6000,
                                bottom: 6000,
                                left: 220
                            },
                            bottom: {
                                top: 220,
                                right: 6000,
                                bottom: 6000,
                                left: 6000
                            },
                            left: {
                                top: 6000,
                                right: 220,
                                left: 6000,
                                bottom: 6000
                            }
                        })
                    })
                ]
            }),
            autoScrollForFiles({
                element: ref.current,
                behavior: [standard()]
            })
        )
    }, []);

    return (
        <div 
            ref={ref} 
            className="mix-blend-mode-unset"
        >
            <div 
                className="kb-wrapper absolute top-0 right-0 left-0 bottom-0 flex flex-row mb-[8px] overflow-x-auto overflow-y-hidden pb-[8px] pt-[2px] px-[6px] kb-scrollbar select-none whitespace-nowrap mix-blend-mode-unset"
            >
                {children}

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
                                                // onPress={addColumn}
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
        </div>
    );
};

export default memo(Board);