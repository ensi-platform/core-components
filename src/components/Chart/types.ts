/* eslint-disable no-use-before-define */
import type { ReactNode } from 'react';

export type ChartProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    children?: ReactNode | ReactNode[];

    width?: string | number;
    height?: string | number;
};