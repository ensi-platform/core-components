import { ReactNode, useContext } from 'react';

import { StackingContext, stackingOrder } from './context';

export type StackProps = {
    /**
     * Render prop, в который передается функция.
     * Функция принимает аргумент со значением z-index из текущего контекста.
     */
    children: (value: number) => ReactNode;

    /**
     * Исходное значение для z-index.
     * @default 10
     */
    value?: number;
};

export * from './context';

export const Stack = ({ children, value = stackingOrder.DEFAULT }: StackProps) => {
    const previousValue = useContext(StackingContext);
    const currentValue = Math.max(value, previousValue);
    const nextValue = currentValue + 1;

    return <StackingContext.Provider value={nextValue}>{children(currentValue)}</StackingContext.Provider>;
};
