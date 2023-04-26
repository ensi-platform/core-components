import { PropsWithChildren } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useTheme } from '@scripts/gds';

export interface SkeletonProps {
    height?: number;
    width?: number;
    count?: number;
    duration?: number;
    circle?: boolean;
    className?: string;
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

const LoadingSkeleton = (props: SkeletonProps) => {
    const { colors } = useTheme();

    return (
        <SkeletonTheme baseColor={colors?.grey200} highlightColor={colors?.white}>
            <Skeleton wrapper={Wrapper} {...props} />
        </SkeletonTheme>
    );
};

export default LoadingSkeleton;
