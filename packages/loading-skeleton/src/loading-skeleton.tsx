import { PropsWithChildren } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { defaultTheme } from '@greensight/core-components-common';

export interface SkeletonProps {
    height?: number;
    width?: number;
    count?: number;
    duration?: number;
    circle?: boolean;
    className?: string;

    baseColor?: string;
    highlightColor?: string;
}

const Wrapper = ({ children }: PropsWithChildren<unknown>) => (
    <div
        css={{
            display: 'flex',
            padding: 0,
            margin: 0,
        }}
    >
        {children}
    </div>
);

const LoadingSkeleton = ({
    baseColor = defaultTheme.colors.grey200,
    highlightColor = defaultTheme.colors.white,
    ...props
}: SkeletonProps) => (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        <Skeleton wrapper={Wrapper} {...props} />
    </SkeletonTheme>
);

export default LoadingSkeleton;
