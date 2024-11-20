import type { ReactNode } from 'react';

export interface IStackProps {
    /**
     * Accepts a ReactNode or function.
     *
     * The function accepts an argument with the z-index value from the current context.
     */
    children: ReactNode | ((value: number) => ReactNode);

    /**
     * Initial z-index value
     * @default 10
     */
    value?: number;
}
