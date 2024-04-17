import { BaseThemeState, StyleDefinition, ValueOrFunction } from '@greensight/core-components-common';

import { SelectItem } from '@greensight/core-components-select';
import { SELECT_THEMES } from '../themes';

export enum SelectSize {
    sm = 'sm',
    md = 'md',
    lg = 'lg',
}

export enum SelectVariant {
    primary = 'primary',
}

export interface SelectState {
    isOpen: boolean;
    isSearch?: boolean;
    hasSelected?: boolean;
    disabled: boolean;
}

export type SelectThemeState = BaseThemeState<typeof SelectVariant, typeof SelectSize, never> & SelectState;

enum SelectParts {
    optionList,
    arrowButton,
    closeButton,
    optionListWrapper,
    optgroup,
}

export type SelectTheme = ValueOrFunction<
    Record<keyof typeof SelectParts, StyleDefinition<SelectThemeState>> & {
        field: StyleDefinition<SelectThemeState & { isFocused: boolean }>;
        option: StyleDefinition<
            SelectThemeState & {
                isSelected: boolean;
                isHover: boolean;
                isDisabled: boolean;
                isPreloader: boolean;
            }
        >;
    },
    [SelectThemeState]
>;

export type SelectThemeProps = Partial<
    Omit<BaseThemeState<typeof SelectVariant, typeof SelectSize, SelectTheme>, 'theme'> & {
        theme?: SelectTheme | keyof typeof SELECT_THEMES;
        /**
         * Список вариантов выбора
         */
        options: Array<SelectItem>;
    }
>;
