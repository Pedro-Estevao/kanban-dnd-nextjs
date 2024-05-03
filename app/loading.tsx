import React from "react";
import LoadingSkeleton from "@/components/SkeletonLoading";
import Skeleton from "react-loading-skeleton";

const LoadingPage = () => {
    return (
        <LoadingSkeleton numberOfElements={2}>
            <div className="w-100">
                <Skeleton />
            </div>
        </LoadingSkeleton>
    );
};

export default LoadingPage;