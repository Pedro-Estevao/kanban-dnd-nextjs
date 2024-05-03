import { SwitchProps } from "@nextui-org/react";

interface SkeletonLoadingProps {
    numberOfElements?: number;
    children?: ReactNode;
}

interface KanbanProps {
    kanbanData: InitialDataProps[];
}

interface TaskProps {
    task: {
        id: string;
        title: string;
    };
    index: number;
}

type ColumnProps = {
    tasks: {
        id: string;
        title: string;
    }[];
    title: string;
    index: number;
}

interface ThemeSwitchProps {
    className?: string;
    classNames?: SwitchProps["classNames"];
}