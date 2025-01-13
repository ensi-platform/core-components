import { type FC, useContext } from 'react';

import { StackingContext } from './context';
import { StackingOrderEnum } from './scripts';
import type { IStackProps } from './types';

const Stack: FC<IStackProps> = ({ children, value = StackingOrderEnum.DEFAULT }) => {
    const previousValue = useContext(StackingContext);
    const currentValue = Math.max(value, previousValue);
    const nextValue = currentValue + 1;

    return (
        <StackingContext.Provider value={nextValue}>
            {typeof children === 'function' ? children(currentValue) : children}
        </StackingContext.Provider>
    );
};

export default Stack;
