import { forwardRef, Fragment, memo, useEffect, useRef, useState } from 'react'

import ReactDOM from 'react-dom'
import invariant from 'tiny-invariant'

// import Avatar from '@atlaskit/avatar'
import {
    attachClosestEdge,
    Edge,
    extractClosestEdge
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/addon/closest-edge'
import {
    draggable,
    dropTargetForElements
} from '@atlaskit/pragmatic-drag-and-drop/adapter/element'
import { dropTargetForFiles } from '@atlaskit/pragmatic-drag-and-drop/adapter/file'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/util/combine'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/util/set-custom-native-drag-preview'

import { Person } from '@/bin/data/people'
import { Avatar, Chip, Tooltip } from "@nextui-org/react"
import clsx from "clsx"
import { CheckBoxIcon, EyeIcon, ListIcon, MessageIcon } from "@/components/Icons"
import { useAppContext } from "@/contexts/appContext"

type DraggableState =
    | { type: 'idle' }
    | { type: 'preview'; container: HTMLElement; rect: DOMRect }
    | { type: 'is-card-over'; closestEdge: Edge | null }
    | { type: 'is-file-over' }
    | { type: 'dragging' }

const idleState: DraggableState = { type: 'idle' }
const draggingState: DraggableState = { type: 'dragging' }

type CardPrimitiveProps = {
    item: Person
    state: DraggableState
    classNameContainer?: string
    classNameContent?: string
}

const CardPrimitive = forwardRef<HTMLDivElement, CardPrimitiveProps>(
    function CardPrimitive({ item, state, classNameContainer, classNameContent }, ref) {
        const { avatarUrl, name, role, userId } = item;
          
        return (
            <div
                ref={ref}
                id={`item-${userId}`}
                className={`kb-card__content ${classNameContainer} relative bg-white dark:bg-[#22272b] tap-highlight-transparent outline-none rounded-[8px] text-[#b6c2cf] cursor-pointer min-h-[36px] scroll-m-[8px] mix-blend-mode-unset`}
            >
                <div className={`relative ${classNameContent} gap-[4px] flex flex-col py-[8px] px-[12px] mix-blend-mode-unset`}>
                    <div className="flex flex-wrap gap-[4px] mix-blend-mode-unset">
                        <Tooltip
                            // key={`${category}-${index}`}
                            placement="bottom"
                            content={"Teste"}
                            // content={category?.title}
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
                                // category && category.color
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
                                    // category && category.color
                                )}
                            />
                        </Tooltip>
                    </div>
                    <span className="block overflow-hidden overflow-wrap-break-word whitespace-normal text-[13px] text-[#172b4d] dark:text-[#b6c2cf] no-underline mix-blend-mode-unset">
                        {/* {card.title} */}
                        {name}
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
                                <Avatar src={avatarUrl} className="w-6 h-6 text-tiny" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
);

export const Card = memo(function Card({ item }: { item: Person }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const { userId } = item;
    const [state, setState] = useState<DraggableState>(idleState);
    const { isDragging, setIsDragging, draggingItem, setDraggingItem } = useAppContext();

    useEffect(() => {
        invariant(ref.current)
        return combine(
            draggable({
                element: ref.current,
                getInitialData: () => ({ type: 'card', itemId: userId }),
                onGenerateDragPreview: ({ location, source, nativeSetDragImage }) => {
                    const rect = source.element.getBoundingClientRect();

                    setCustomNativeDragPreview({
                        nativeSetDragImage,
                        getOffset() {
                            /**
                             * This offset ensures that the preview is positioned relative to
                             * the cursor based on where you drag from.
                             *
                             * This creates the effect of it being picked up.
                             */
                            return {
                                x: location.current.input.clientX - rect.x,
                                y: location.current.input.clientY - rect.y
                            }
                        },
                        render({ container }) {
                            setState({ type: 'preview', container, rect })
                            return () => setState(draggingState)
                        }
                    });
                },

                onDragStart: (args) => {
                    setState(draggingState);
                    setIsDragging(true);
                    setDraggingItem({
                        id: userId,
                        type: 'card',
                        width: args.source.element.offsetWidth,
                        height: args.source.element.offsetHeight
                    });
                },
                onDrop: () => {
                    setState(idleState);
                    setIsDragging(!isDragging);
                    setDraggingItem({
                        id: "",
                        type: null,
                        width: 0,
                        height: 0
                    });
                }
            }),
            dropTargetForFiles({
                element: ref.current,
                onDragEnter: (args) => {
                    setState({ type: 'is-file-over' })
                },
                onDragLeave: () => {
                    setState(idleState)
                },
                onDrop: () => {
                    setState(idleState);
                }
            }),
            dropTargetForElements({
                element: ref.current,
                canDrop: (args) => args.source.data.type === 'card',
                getIsSticky: () => true,
                getData: ({ input, element }) => {
                    const data = { type: 'card', itemId: userId }

                    return attachClosestEdge(data, {
                        input,
                        element,
                        allowedEdges: ['top', 'bottom']
                    });
                },
                onDragEnter: (args) => {
                    if (args.source.data.itemId === userId) {
                        return
                    }
                    const closestEdge: Edge | null = extractClosestEdge(args.self.data)
                    setState({
                        type: 'is-card-over',
                        closestEdge
                    });
                },
                onDrag: (args) => {
                    if (args.source.data.itemId === userId) {
                        return
                    }
                    const closestEdge: Edge | null = extractClosestEdge(args.self.data)
                    // conditionally update react state if change has occurred
                    setState((current) => {
                        if (current.type !== 'is-card-over') {
                            return current
                        }
                        if (current.closestEdge === closestEdge) {
                            return current
                        }
                        return {
                            type: 'is-card-over',
                            closestEdge
                        }
                    });
                },
                onDragLeave: (args) => {
                    setState(idleState);
                },
                onDrop: (args) => {
                    setState(idleState);
                }
            })
        )
    }, [isDragging, item, setDraggingItem, setIsDragging, userId])

    return (
        <div className={`kb-card flex flex-col mb-[8px] scroll-m-[80px] mix-blend-mode-unset ${isDragging && draggingItem.type === 'card' && draggingItem.id === userId ? "hidden m-0" : ""}`}>
            {state.type === 'is-card-over' && state.closestEdge === "top" && (
                <div 
                    className={`relative flex items-center justify-center rounded-[8px] bg-green-500 mb-[8px]`}
                    style={{ width: `${draggingItem.width}px`, height: `${draggingItem.height}px` }}
                >
                    <span>Here</span>
                </div>
            )}

            <CardPrimitive 
                ref={ref} 
                item={item} 
                state={state}
            />

            {state.type === 'is-card-over' && state.closestEdge === "bottom" && (
                <div 
                    className={`relative flex items-center justify-center rounded-[8px] bg-green-500 mt-[8px]`}
                    style={{ width: `${draggingItem.width}px`, height: `${draggingItem.height}px` }}
                >
                    <span>Here</span>
                </div>
            )}

            {state.type === 'preview' &&
                ReactDOM.createPortal(
                    <div
                        style={{
                            /**
                             * Ensuring the preview has the same dimensions as the original.
                             *
                             * Using `border-box` sizing here is not necessary in this
                             * specific example, but it is safer to include generally.
                             */
                            boxSizing: 'border-box',
                            width: state.rect.width,
                            height: state.rect.height,
                            transform: 'rotate(4deg)',
                        }}
                    >
                        <CardPrimitive item={item} state={state} />
                    </div>,
                    state.container
                )
            }
        </div>
    )
})
