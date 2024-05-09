import { CSSProperties, forwardRef, Fragment, memo, useEffect, useRef, useState } from 'react'

import ReactDOM from 'react-dom'

import { css, SerializedStyles } from '@emotion/react'
import { createPortal } from 'react-dom'
import invariant from 'tiny-invariant'

import { unsafeOverflow } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/behavior/unsafe-overflow'
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
import { autoScrollForFiles } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/file'
import {
	attachClosestEdge,
	Edge,
	extractClosestEdge
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/addon/closest-edge'
import {
	draggable,
	dropTargetForElements
} from '@atlaskit/pragmatic-drag-and-drop/adapter/element'
import { centerUnderPointer } from '@atlaskit/pragmatic-drag-and-drop/util/center-under-pointer'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/util/combine'
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/util/set-custom-native-drag-preview'
import { token } from '@atlaskit/tokens'

import { ColumnType } from '@/bin/data/people'

import { Card } from '../Card'
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react"
import { AddIcon, DeleteIcon, MoreIcon } from "@/components/Icons"
import { categoriesCard } from "@/bin/initialData"

type State =
	| { type: 'idle' }
	| { type: 'is-card-over' }
	| { type: 'generate-safari-column-preview'; container: HTMLElement }
	| { type: 'generate-column-preview'; container: HTMLElement }
	| { type: 'is-column-over'; closestEdge: Edge | null }

type ColumnPrimitiveProps = {
	column: ColumnType;
	state: State;
	classNameContainer?: string;
	classNameContent?: string;
};

type IsDraggingProps = {
	active: boolean;
	width: number;
	height: number;
};

// preventing re-renders
const idle: State = { type: 'idle' }
const isCardOver: State = { type: 'is-card-over' }

const stateStyles: { [key in State['type']]: SerializedStyles | undefined } = {
	idle: undefined,
	'is-column-over': undefined,
	'is-card-over': css({
		background: token('color.background.selected.hovered', '#CCE0FF')
	}),
	/**
	 * **Browser bug workaround**
	 *
	 * _Problem_
	 * When generating a drag preview for an element
	 * that has an inner scroll container, the preview can include content
	 * vertically before or after the element
	 *
	 * _Fix_
	 * We make the column a new stacking context when the preview is being generated.
	 * We are not making a new stacking context at all times, as this _can_ mess up
	 * other layering components inside of your card
	 *
	 * _Fix: Safari_
	 * We have not found a great workaround yet. So for now we are just rendering
	 * a custom drag preview
	 */
	'generate-column-preview': css({
		isolation: 'isolate'
	}),
	'generate-safari-column-preview': undefined
};

const SafariColumnPreview = ({ column }: { column: ColumnType }) => {
	return (
		<div style={{
            '--grid': '8px',
            display: 'flex',
            padding: 'calc(var(--grid) * 2)',
            justifyContent: 'space-between',
            flexDirection: 'row',
            color: token('color.text.subtlest', '#626F86'),
            userSelect: 'none',
            backgroundColor: token('elevation.surface.sunken', '#F7F8F9'),
            borderRadius: 'calc(var(--grid) * 2)',
            width: 250
        } as React.CSSProperties}>
            <div className="flex pt-[16px] px-[16px] pb-[8px] justify-between flex-row text-[#626F86] select-none">
                <span className="text-[#172B4D] text-[12px] font-semibold leading-[16px] uppercase">
                    {column.title}
                </span>
            </div>
		</div>
	)
};

const ColumnPrimitive = forwardRef<HTMLDivElement, ColumnPrimitiveProps>(
    function ColumnPrimitive({ column, state, classNameContainer, classNameContent }, ref) {
        return (
            <div className={`kb-column ${classNameContainer} block self-start flex-shrink-0 py-0 px-[6px] h-full whitespace-nowrap mix-blend-mode-unset`}>
				<div
					ref={ref}
					className={`relative ${classNameContent} flex flex-col justify-between bg-[#f4f4f5] dark:bg-[#d4d4d81a] overflow-hidden tap-highlight-transparent outline-none rounded-[18px] text-[#9fadbc] border-none max-h-full p-0 scroll-m-[8px] whitespace-normal w-[272px] box-border align-top mix-blend-mode-unset`}
				>
					<div className={`absolute top-0 left-0 right-0 w-full h-[5px] bg-green-500`} />

					<div
						className="relative flex items-start justify-between flex-wrap flex-grow-0 gap-y-0 p-[8px] pt-[10px] mix-blend-mode-unset"
					>
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
										// onClick={() => removeColumn(column.id)}
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

					<div
						className="kb-column__content flex flex-col flex-auto my-0 mx-[4px] py-0 px-[5px] h-full min-h-[10px] overflow-x-hidden overflow-y-auto kb-scrollbar-column mix-blend-mode-unset"
					>
						<div 
							className="flex flex-col gap-0 p-0 border-box mix-blend-mode-unset"
						>
							{column.items.map((item) => (
								<Card item={item} key={item.userId} />
							))}
						</div>
					</div>

					<div className="flex items-center justify-between gap-x-[4px] p-[8px] mix-blend-mode-unset">
						<Button
							className="rounded-[8px] p-[8px] h-fit w-full"
							variant="light"
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
					</div>
				</div>
			</div>
        )
    }
);

const Column = ({ column }: { column: ColumnType }) => {
    const addCardModal = useDisclosure();
	const columnId = column.columnId;
	const columnRef = useRef<HTMLDivElement | null>(null)
	const headerRef = useRef<HTMLDivElement | null>(null)
	const cardListRef = useRef<HTMLDivElement | null>(null)
	const scrollContainerRef = useRef<HTMLDivElement | null>(null)
	const [state, setState] = useState<State>(idle);
	const [isDragging, setIsDragging] = useState<IsDraggingProps>({
        active: false,
        width: 0,
        height: 0
    } as IsDraggingProps);

	useEffect(() => {
		invariant(columnRef.current)
		invariant(headerRef.current)
		invariant(cardListRef.current)
		invariant(scrollContainerRef.current)
		return combine(
			draggable({
				element: columnRef.current,
				dragHandle: headerRef.current,
				getInitialData: () => ({ columnId, type: 'column' }),
				onGenerateDragPreview: ({ location, source, nativeSetDragImage }) => {
					const isSafari: boolean =
						navigator.userAgent.includes('AppleWebKit') &&
						!navigator.userAgent.includes('Chrome')

					if (!isSafari) {
						// TODO: scroll container preview is wacky when scrolled
						// scrolling the container to the start does not seem to fix it
						// Likely we will need to generate a custom preview

						// setState({ type: 'generate-column-preview' });
						// return

						setCustomNativeDragPreview({
							getOffset: centerUnderPointer,
							render: ({ container }) => {
								setState({ type: 'generate-column-preview', container })
								return () => setState(idle)
							},
							nativeSetDragImage
						});
					}

					setCustomNativeDragPreview({
						getOffset: centerUnderPointer,
						render: ({ container }) => {
							setState({ type: 'generate-safari-column-preview', container })
							return () => setState(idle)
						},
						nativeSetDragImage
					});
				},
				onDragStart: (args) => {
					setState(idle);
					setIsDragging(prevState => ({ 
                        ...prevState,
                        active: true, 
                        width: args.source.element.offsetWidth, 
                        height: args.source.element.offsetHeight 
                    }));
				},
				onDrop: () => {
					setState(idle);
                    setIsDragging(prevState => ({ 
                        ...prevState,
                        active: false, 
                        width: 0, 
                        height: 0
                    }));
				}
			}),
			dropTargetForElements({
				element: cardListRef.current,
				getData: () => ({ columnId }),
				canDrop: (args) => args.source.data.type === 'card',
				getIsSticky: () => true,
				onDragEnter: () => setState(isCardOver),
				onDragLeave: () => setState(idle),
				onDragStart: () => setState(isCardOver),
				onDrop: () => setState(idle)
			}),
			dropTargetForElements({
				element: columnRef.current,
				canDrop: (args) => args.source.data.type === 'column',
				getIsSticky: () => true,
				getData: ({ input, element }) => {
					const data = {
						columnId
					}
					return attachClosestEdge(data, {
						input,
						element,
						allowedEdges: ['left', 'right']
					})
				},
				onDragEnter: (args) => {
					setState({
						type: 'is-column-over',
						closestEdge: extractClosestEdge(args.self.data)
					})
				},
				onDrag: (args) => {
					// skip react re-render if edge is not changing
					setState((current) => {
						const closestEdge: Edge | null = extractClosestEdge(args.self.data)
						if (
							current.type === 'is-column-over' &&
							current.closestEdge === closestEdge
						) {
							return current
						}
						return {
							type: 'is-column-over',
							closestEdge
						}
					})
				},
				onDragLeave: () => {
					setState(idle)
				},
				onDrop: () => {
					setState(idle)
				}
			}),
			autoScrollForElements({
				element: scrollContainerRef.current,
				canScroll: ({ source }) => source.data.type === 'card',
				behavior: [
					// standard(),
					unsafeOverflow({
						getHitboxSpacing: () => ({
							top: {
								top: 6000,
								right: 0,
								bottom: 220,
								left: 0
							},
							right: {
								top: 0,
								right: 0,
								bottom: 0,
								left: 0
							},
							bottom: {
								top: 220,
								right: 0,
								bottom: 6000,
								left: 0
							},
							left: {
								top: 0,
								right: 0,
								bottom: 0,
								left: 0
							}
						})
					})
				]
			}),
			autoScrollForFiles({
				element: scrollContainerRef.current
			})
		)
	}, [columnId])

	return (
		<>
			{state.type === 'is-column-over' && state.closestEdge === "left" && (
				<div className={`relative flex items-center justify-center w-[272px] h-full rounded-[8px] bg-green-500 mb-[8px]`}>
					<span>Here</span>
				</div>
			)}

			<div className={`kb-column block self-start flex-shrink-0 py-0 px-[6px] h-full whitespace-nowrap mix-blend-mode-unset ${isDragging.active ? "hidden m-0" : ""}`}>
				<div
					ref={columnRef}
					className="relative flex flex-col justify-between bg-[#f4f4f5] dark:bg-[#d4d4d81a] overflow-hidden tap-highlight-transparent outline-none rounded-[18px] text-[#9fadbc] border-none max-h-full p-0 scroll-m-[8px] whitespace-normal w-[272px] box-border align-top mix-blend-mode-unset"
				>
					<div className={`absolute top-0 left-0 right-0 w-full h-[5px] bg-green-500`} />

					<div
						ref={headerRef}
						className="relative flex items-start justify-between flex-wrap flex-grow-0 gap-y-0 p-[8px] pt-[10px] mix-blend-mode-unset"
						data-testid={`column-${columnId}--header`}
					>
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
										// onClick={() => removeColumn(column.id)}
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

					<div 
						ref={scrollContainerRef}
						className="kb-column__content flex flex-col flex-auto my-0 mx-[4px] py-0 px-[5px] h-full min-h-[10px] overflow-x-hidden overflow-y-auto kb-scrollbar-column mix-blend-mode-unset"
					>
						<div 
							className="flex flex-col gap-0 p-0 border-box mix-blend-mode-unset"
							ref={cardListRef}
						>
							{column.items.map((item) => (
								<Card item={item} key={item.userId} />
							))}
						</div>
					</div>

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
												isRequired
												// isInvalid={state.titleIsValid === false}
												errorMessage={"Please enter a name for this card."}
												// onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
												// onChange={(e) => dispatch({ type: 'setTitle', payload: e.target.value, isValid: true })}
											/>
											<Select
												items={categoriesCard}
												label="Select categories for this card"
												isMultiline
												isRequired
												// isInvalid={state.categoriesIsValid === false}
												errorMessage={"Please select at least one category."}
												selectionMode="multiple"
												// onSelectionChange={(keys) => {
												//     const selectedCategories = Array.from(keys).map((key) => categoriesCard[Number(key)].id);
												//     setNewCard({ ...newCard, categories: selectedCategories });
												// }}
												// onSelectionChange={(keys) => {
												//     const selectedCategories = Array.from(keys).map((key) => categoriesCard[Number(key)].id);
												//     dispatch({ type: 'setCategories', payload: selectedCategories, isValid: true });
												// }}
												renderValue={(items) => {
													return (
														<div className="flex flex-wrap gap-2">
															{items.map((item) => (
																<Chip key={item.key} className={`block h-auto p-0 ${item.data?.color} rounded-[4px]`}>{item.data?.title}</Chip>
															))}
														</div>
													);
												}}
											>
												{(item) => (
													<SelectItem 
														key={item.id} 
														textValue={item.title.toLowerCase()}
													>
														<Chip className={`block h-auto p-0 ${item.color} rounded-[4px]`}>{item.title}</Chip>
													</SelectItem>
												)}
											</Select>
										</ModalBody>
										<ModalFooter className="flex flex-row items-center justify-between w-full">
											<Button color="danger" variant="flat" onPress={addCardModal.onClose}>
												Cancel
											</Button>
											<Button 
												color="primary" 
												// onPress={addCard}
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

				{state.type === 'generate-safari-column-preview'
					? createPortal(<SafariColumnPreview column={column} />, state.container)
					: null}

				{state.type === 'generate-column-preview' ?
					ReactDOM.createPortal(
						<div
							style={{
								boxSizing: 'border-box',
								// width: state.rect.width,
								// height: state.rect.height,
								transform: 'rotate(4deg)',
							}}
						>
							<ColumnPrimitive column={column} state={state} />,
						</div>,
						state.container
					) : null
				}
			</div>
		
			{state.type === 'is-column-over' && state.closestEdge === "right" && (
				<div className={`relative flex items-center justify-center w-[272px] h-full rounded-[8px] bg-green-500 mb-[8px]`}>
					<span>Here</span>
				</div>
			)}
		</>
	);
};

export default memo(Column);
