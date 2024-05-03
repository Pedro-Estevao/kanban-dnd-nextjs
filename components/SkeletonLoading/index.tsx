import React from "react";
import { SkeletonLoadingProps } from "@/@types/components";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoading = ({
    numberOfElements = 1,
    children,
}: SkeletonLoadingProps) => {
    const elementsNumber = numberOfElements <= 0 ? 1 : numberOfElements;

    const elements = Array.from({ length: elementsNumber }, (_, index) => (
        <React.Fragment key={index}>{children}</React.Fragment>
    ));

    return (
        <SkeletonTheme baseColor={"#444"} highlightColor={"#6b6b6b"}>
            <>{elements}</>
        </SkeletonTheme>
    );
};

export default SkeletonLoading;
