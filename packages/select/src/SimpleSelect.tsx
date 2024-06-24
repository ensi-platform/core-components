import { forwardRef, useMemo } from 'react';

import {
    BaseSelect,
    Arrow as DefaultArrow,
    Field as DefaultField,
    Option as DefaultOption,
    OptionsList as DefaultOptionsList,
} from './components';
import { SelectProps } from './types';

export const SimpleSelect = forwardRef<HTMLDivElement, SelectProps>(
    (
        {
            Arrow = DefaultArrow,
            Field = DefaultField,
            OptionsList = DefaultOptionsList,
            Option = DefaultOption,
            ...restProps
        },
        ref
    ) => {
        const props = useMemo(
            () => ({
                ref,
                Option,
                Field,
                OptionsList,
                Arrow,
                ...restProps,
            }),
            [Arrow, Field, Option, OptionsList, ref, restProps]
        );

        return <BaseSelect {...props} />;
    }
);

SimpleSelect.displayName = 'SimpleSelect';
