import React from 'react';
import { CardCompProps } from "@/@types/components";
import { Draggable, DraggableStateSnapshot, DraggableStyle } from "@hello-pangea/dnd";
import { Avatar, Chip, Tooltip } from "@nextui-org/react";
import { CheckBoxIcon, EyeIcon, ListIcon, MessageIcon } from "../Icons";
import { categoriesCard } from "@/bin/initialData";
import clsx from "clsx";

const Card = ({
    card,
    index,
    // columnProps,
    // columnSnapshot,
    // columnIndex,
}: CardCompProps) => {
    // const [isDragging, setIsDragging] = useState(false);
    // const [prevIsDragging, setPrevIsDragging] = useState(false);
    // const [cardProps, setCardProps] = useState<CardDraggableProps>({} as CardDraggableProps);
    // const queryAttrItem = "data-rfd-drag-handle-draggable-id";
    // const queryAttrList = "data-rfd-droppable-id";
    // const queryAttrContext = "data-rfd-drag-handle-context-id";
    // const queryAttrPlaceholder = "data-rfd-placeholder-context-id";

    // const getDraggedDom = (draggableId: string) => {
    //     return document.querySelector(`[${queryAttrItem}="${draggableId}"]`) as HTMLElement;
    // }

    // const handleMove = useCallback(() => {
    //     const list = document.querySelector(`[${queryAttrList}="${columnProps["data-rfd-droppable-id"]}"]`) as HTMLElement;

    //     if (!list) {
    //         return;
    //     }

    //     const draggedDom = list.querySelector(`[${queryAttrItem}="${card.id.toString()}"]`) as HTMLElement;
    //     const context = draggedDom.getAttribute(queryAttrContext);
    //     const placeholder = list.querySelector(`[${queryAttrPlaceholder}="${context}"]`) as HTMLElement;

    //     let distance = Array.from(list.children)
    //         .slice(columnIndex)
    //         .reduce((total, curr) => {
    //             if (curr.classList.contains("kb-card")) {
    //                 const style = window.getComputedStyle(curr);
    //                 const marginBottom = parseFloat(style.marginBottom);
    //                 return total + curr.clientHeight + marginBottom;
    //             }
    //             return total;
    //         }, 0);

    //     placeholder.style.border = `2px dashed`;
    //     placeholder.style.borderRadius = `8px`;
    //     placeholder.style.transform = `translate(0px, -${distance}px)`;
    // }, [columnIndex, columnProps, card.id]);

    // const handleUpdate = (source: DraggableLocation, destination: DraggableLocation, draggableId: string) => {
    //     if (!destination) {
    //         return;
    //     }

    //     const draggedDom = getDraggedDom(draggableId);
    //     const context = draggedDom?.getAttribute(queryAttrContext);
    //     console.log(context);
    //     const placeholder = document.querySelector(`[${queryAttrPlaceholder}="${context}"]`);
    //     console.log(placeholder);

    //     if (!draggedDom) {
    //         return;
    //     }
    //     if (!placeholder) {
    //         return;
    //     }

    //     const { clientHeight, clientWidth } = draggedDom as unknown as HTMLElement;
    //     const destinationIndex = destination.index;
    //     const sourceIndex = source.index;

    //     const childrenArray = Array.from(draggedDom.parentNode?.children as HTMLCollectionOf<HTMLElement>);
    //     const movedItem = childrenArray[sourceIndex];
    //     childrenArray.splice(sourceIndex, 1);

    //     const updatedArray = [
    //         ...childrenArray.slice(0, destinationIndex),
    //         movedItem,
    //         ...childrenArray.slice(destinationIndex)
    //     ];

    //     let clientY = parseFloat(window.getComputedStyle(draggedDom.parentNode as Element).paddingTop) +
    //         updatedArray.slice(0, destinationIndex)
    //             .reduce((total, curr) => {
    //                 const style = window.getComputedStyle(curr);
    //                 const marginBottom = parseFloat(style.marginBottom);
    //                 return total + curr.clientHeight + marginBottom;
    //             }, 0);
    // }

    const getItemStyle = (style: DraggableStyle | undefined, snapshot: DraggableStateSnapshot) => {
        if (!snapshot.isDropAnimating) {
            return style;
        }

        return {
            ...style,
            transitionDuration: `0.001s`,
            // useSelect: `none`,
            // margin: `0 0 ${grid}px 0`,
            // backgroundColor: snapshot.isDragging ? `#f4f4f5` : `#ffffff`,
        };
    }

    // useEffect(() => {
    //     // if (!prevIsDragging && isDragging) {
    //     //     handleMove();
    //     // }
    //     if (isDragging) {
    //         handleMove();
    //     }
    //     // setPrevIsDragging(isDragging);
    // }, [handleMove, isDragging, prevIsDragging, columnProps]);

    // useEffect(() => {
    //     console.log("ColumnProps:",columnProps);
    //     console.log("ColumnSnapshot:",columnSnapshot);
    //     console.log("CardProps:",cardProps);
    // }, [columnProps, columnSnapshot, cardProps]);

    return (
        <div className="kb-card flex flex-col scroll-m-[80px] mix-blend-mode-unset">
            <Draggable draggableId={card.id.toString()} index={index}>
                {(provided, snapshot) => {
                    // if (snapshot.isDragging !== isDragging) {
                    //     setIsDragging(snapshot.isDragging);
                    //     setCardProps({ provided, snapshot });
                    // }
                    // if (snapshot.isDragging) {
                    //     setIsDragging(snapshot.isDragging);
                    //     // setCardProps({ provided, snapshot });
                    // }

                    return (
                        <div
                            className="kb-card__content relative mb-[8px] bg-white dark:bg-[#22272b] tap-highlight-transparent outline-none rounded-[8px] text-[#b6c2cf] cursor-pointer min-h-[36px] scroll-m-[8px] mix-blend-mode-unset"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            style={{
                                ...getItemStyle(provided.draggableProps.style, snapshot),
                                opacity: snapshot.isDragging ? 0.4 : 1,
                            }}
                        >
                            <div className="relative flex gap-[4px] flex-col py-[8px] px-[12px] mix-blend-mode-unset">
                                <div className="flex flex-wrap gap-[4px] mix-blend-mode-unset">
                                    {card.categories.map((categoryId, index) => {
                                        const category = categoriesCard.find((cat) => cat.id === categoryId);
                                        return (
                                            <Tooltip 
                                                key={`${category}-${index}`}
                                                placement="bottom"
                                                content={category?.title}
                                                className={clsx(
                                                    "capitalize text-[12px]",
                                                    "bg-slate-500",
                                                    "bg-gray-500",
                                                    "bg-stone-500",
                                                    "bg-red-500",
                                                    "bg-orange-500",
                                                    "bg-yellow-500",
                                                    "bg-lime-500",
                                                    "bg-green-500",
                                                    "bg-teal-500",
                                                    "bg-cyan-500",
                                                    "bg-sky-500",
                                                    "bg-violet-500",
                                                    "bg-fuchsia-500",
                                                    "bg-rose-500",
                                                    "bg-amber-500",
                                                    category && category.color
                                                )} 
                                            >
                                                <Chip
                                                    className={clsx(
                                                        "relative inline-block rounded-[4px] box-border align-middle overflow-hidden text-ellipsis whitespace-nowrap m-0 p-0 min-w-[40px] max-w-[40px] h-[8px]",
                                                        "bg-slate-500",
                                                        "bg-gray-500",
                                                        "bg-stone-500",
                                                        "bg-red-500",
                                                        "bg-orange-500",
                                                        "bg-yellow-500",
                                                        "bg-lime-500",
                                                        "bg-green-500",
                                                        "bg-teal-500",
                                                        "bg-cyan-500",
                                                        "bg-sky-500",
                                                        "bg-violet-500",
                                                        "bg-fuchsia-500",
                                                        "bg-rose-500",
                                                        "bg-amber-500",
                                                        category && category.color
                                                    )} 
                                                />
                                            </Tooltip>
                                        )
                                    })}
                                </div>
                                <span className="block overflow-hidden overflow-wrap-break-word whitespace-normal text-[13px] text-[#172b4d] dark:text-[#b6c2cf] no-underline mix-blend-mode-unset">
                                    {card.title}
                                </span>
                                <div className="flex flex-wrap gap-[4px] float-left max-w-full w-full mix-blend-mode-unset">
                                    <div className="flex flex-wrap float-left gap-x-[4px] max-w-full mix-blend-mode-unset">
                                        <span className="relative flex items-center justify-center rounded-[3px] p-[2px] w-fit max-w-full h-[24px] text-[#9fadbc] text-[12px] box-border mix-blend-mode-unset">
                                            <EyeIcon size={16} />
                                        </span>
                                        <span className="relative flex items-center justify-center rounded-[3px] p-[2px] w-fit max-w-full h-[24px] text-[#9fadbc] text-[12px] box-border mix-blend-mode-unset">
                                            <ListIcon size={16} />
                                        </span>
                                        <span className="relative flex items-center justify-center rounded-[3px] p-[2px] w-fit max-w-full h-[24px] text-[#9fadbc] text-[12px] box-border mix-blend-mode-unset">
                                            <MessageIcon size={16} />
                                        </span>
                                        <span className="relative flex items-center justify-center rounded-[3px] p-[2px] w-fit max-w-full h-[24px] text-[#9fadbc] text-[12px] box-border mix-blend-mode-unset">
                                            <CheckBoxIcon size={16} />
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap justify-end gap-[4px] ml-auto float-right -mr-[4px] mix-blend-mode-unset">
                                        <span className="relative flex items-center justify-center h-[24px] w-[24px]">
                                            {/* <Avatar src="/imgs/avatars/150-0.jpeg" className="w-6 h-6 text-tiny" /> */}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Draggable>
        </div>
    );
};

export default Card;