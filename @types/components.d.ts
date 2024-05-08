import { SwitchProps } from "@nextui-org/react";
import { DraggableProvided, DraggableStateSnapshot, DroppableProvidedProps, DroppableStateSnapshot } from "@hello-pangea/dnd";

interface SkeletonLoadingProps {
    numberOfElements?: number;
    children?: ReactNode;
};

interface KanbanProps {
    kanbanData: InitialDataProps;
};

interface CardProps {
    id: string;
    title: string;
    categories: string[];
};

interface CardInitialStateProps {
    id: string;
    title: string;
    categories: string[];
    titleIsValid: boolean | null;
    categoriesIsValid: boolean | null;
};

interface CardCompProps {
    card: CardProps;
    index: number;
    // columnProps: DroppableProvidedProps;
    // columnSnapshot: DroppableStateSnapshot;
    // columnIndex: number;
};

interface CardDraggableProps {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
};

type ColumnProps = {
    column: InitialDataColumnProps;
    lastId: InitialDataLastIdProps;
    index: number;
    updateColumn: (columnId: string, newCards: CardProps[]) => void;
    removeColumn: (columnId: string) => void;
};

interface ThemeSwitchProps {
    className?: string;
    classNames?: SwitchProps["classNames"];
};