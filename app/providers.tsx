'use client';

import * as React from "react";
import { ProvidersProps } from "@/@types/providers";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppContextProvider } from "@/contexts/appContext";

export const Providers = ({ children, themeProps }: ProvidersProps) => {
    const router = useRouter();

    return (
        <AppContextProvider>
            <NextUIProvider navigate={router.push}>
                <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
            </NextUIProvider>
        </AppContextProvider>
    );
};