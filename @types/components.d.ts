import { SwitchProps } from "@nextui-org/react";
import { DraggableProvided, DraggableStateSnapshot, DroppableProvidedProps, DroppableStateSnapshot } from "@hello-pangea/dnd";

interface SkeletonLoadingProps {
    numberOfElements?: number;
    children?: ReactNode;
}

interface KanbanProps {
    kanbanData: InitialDataProps;
}

interface CardProps {
    card: {
        id: string;
        title: string;
        categories: string[];
    };
    index: number;
    // columnProps: DroppableProvidedProps;
    // columnSnapshot: DroppableStateSnapshot;
    // columnIndex: number;
}

interface CardDraggableProps {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
}

type ColumnProps = {
    column: InitialDataColumnProps;
    lastId: InitialDataLastIdProps;
    index: number;
    removeColumn: (columnId: string) => void;
}

interface ThemeSwitchProps {
    className?: string;
    classNames?: SwitchProps["classNames"];
}