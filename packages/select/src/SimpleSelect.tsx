import { forwardRef, useMemo } from 'react';

import {
    BaseSelect,
    Arrow as DefaultArrow,
    Field as DefaultField,
    Optgroup as DefaultOptgroup,
    Option as DefaultOption,
    OptionsList as DefaultOptionsList,
} from './components';
import { type SelectProps } from './types';

export const SimpleSelect = forwardRef<HTMLDivElement, SelectProps>(
    (
        {
            Arrow = DefaultArrow,
            Field = DefaultField,
            OptionsList = DefaultOptionsList,
            Optgroup = DefaultOptgroup,
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
                Optgroup,
                OptionsList,
                Arrow,
                ...restProps,
            }),
            [Arrow, Field, Optgroup, Option, OptionsList, ref, restProps]
        );

        return <BaseSelect {...props} />;
    }
);

SimpleSelect.displayName = 'SimpleSelect';
