import type { BaseThemeState, StyleDefinition, ValueOrFunction } from '@ensi-platform/core-components-common';
import type { IFieldWrapperProps } from '@ensi-platform/core-components-form';

import type { HTMLProps } from 'react';

export type View = 'vertical' | 'horizontal';

export interface CounterState {
    hasLabel: boolean;
    view: View;
    max: number;
    rounded: boolean;
}

export const CounterVariant = {
    primary: 'primary',
} as const;

export const CounterSize = {
    md: 'md',
    lg: 'lg',
} as const;

export type CounterThemeState = BaseThemeState<typeof CounterVariant, typeof CounterSize> & CounterState;

export type CounterTheme = ValueOrFunction<
    {
        decrButton: StyleDefinition<CounterThemeState>;
        incrButton: StyleDefinition<CounterThemeState>;
        icon: StyleDefinition<CounterThemeState>;
        input: StyleDefinition<CounterThemeState>;
        layout: StyleDefinition<CounterThemeState>;
    },
    [CounterThemeState]
>;

export type CounterProps = Partial<Omit<CounterState, 'hasLabel' | 'view'>> &
    Partial<Omit<BaseThemeState<typeof CounterVariant, typeof CounterSize, CounterTheme>, 'theme'>> &
    Omit<HTMLProps<HTMLInputElement>, 'onChange' | 'size'> &
    Partial<IFieldWrapperProps<number>> & {
        /** Parsed value */
        value?: number;

        /** Вид отображения */
        view?: View;

        /** Minimum value */
        min?: number;

        /** Maximum value */
        max?: number;

        /** Step value */
        step?: number;

        /** Handler change event on input */
        onChange?: (value: number) => void;

        /** Hint text */
        hint?: string;

        theme?: CounterTheme;
    };
