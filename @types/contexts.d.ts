import { DropResult } from "@hello-pangea/dnd";

interface DndContextProps {
    children: React.ReactNode;
    onDragEnd: (result: DropResult) => void;
}