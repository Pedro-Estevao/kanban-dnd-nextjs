'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type DraggingItemType = {
    id: string;
    type: 'column' | 'card' | null;
    width: number;
    height: number;
};

const AppContext = createContext({
    isDragging: false,
    setIsDragging: (isDragging: boolean) => {},
    draggingItem: {
        id: "",
        type: null,
        width: 0,
        height: 0,
    } as DraggingItemType,
    setDraggingItem: (draggingItem: DraggingItemType) => {},
});

export const AppContextProvider = ({ children }: { children: ReactNode}) => {
    const [isDragging, setIsDragging] = useState<boolean>(() => {
        let localData = null;
        if (typeof window !== "undefined") {
            localData = localStorage.getItem("isDragging");
        }
        return localData ? JSON.parse(localData) : false;
    });
    const [draggingItem, setDraggingItem] = useState<DraggingItemType>(() => {
        let localData = null;
        if (typeof window !== "undefined") {
            localData = localStorage.getItem("draggingItem");
        }
        return localData ? JSON.parse(localData) : { id: "", type: null, width: 0, height: 0 };
    });

    useEffect(() => {
        localStorage.setItem("isDragging", JSON.stringify(isDragging));
    }, [isDragging]);

    useEffect(() => {
        localStorage.setItem("draggingItem", JSON.stringify(draggingItem));
    }, [draggingItem]);

    return (
        <AppContext.Provider 
            value={{ 
                isDragging, 
                setIsDragging, 
                draggingItem,
                setDraggingItem
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);