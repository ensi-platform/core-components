import {
    type BaseThemeState,
    type StyleDefinition,
    type ValueOrFunction,
    useThemeCSSPart,
} from '@ensi-platform/core-components-common';

import type { HTMLProps, ReactNode, SVGProps } from 'react';

export const AccordionSize = {
    md: 'md',
} as const;

export const AccordionVariant = {
    primary: 'primary',
} as const;

type SVGRIcon = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export interface AccordionState {
    /** CSSTransition timeout */
    transitionTimeout?: number;
    /** CSSTransition timeout on exit (if differs) */
    transitionTimeoutExit?: number;
    /** Type of panel toggle animation */
    animationType?: 'height' | 'fadeIn' | 'custom';
    /** Icon for arrow */
    Icon?: SVGRIcon;
}

export type AccordionThemeState = BaseThemeState<typeof AccordionVariant, typeof AccordionSize> & AccordionState;

export type AccordionTheme = ValueOrFunction<
    {
        container: StyleDefinition<AccordionThemeState>;
        button: StyleDefinition<AccordionThemeState>;
        buttonIcon: StyleDefinition<AccordionThemeState>;
        item: StyleDefinition<AccordionThemeState>;
        panel: StyleDefinition<AccordionThemeState>;
    },
    [AccordionThemeState]
>;

const useFoo = () => useThemeCSSPart<AccordionThemeState, AccordionTheme>(...([] as never as [any, any]));

export interface AccordionContextProps extends AccordionState {
    /** CSSTransition handler, triggers after add 'enter' class */
    onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
    /** CSSTransition handler, triggers after add 'enter-active' class */
    onEntering?: (node: HTMLElement, isAppearing: boolean) => void;
    /** CSSTransition handler, triggers after add 'exit' class */
    onExit?: (node: HTMLElement) => void;

    theme?: AccordionTheme;

    getCSS: ReturnType<typeof useFoo>;
}

export interface AccordionProps
    extends Partial<Omit<BaseThemeState<typeof AccordionVariant, typeof AccordionSize, AccordionTheme>, 'theme'>>,
        Omit<AccordionContextProps, 'getCSS'>,
        Omit<HTMLProps<HTMLDivElement>, 'onChange' | 'ref' | 'size'> {
    /** List of Accordion.Item components */
    children: ReactNode;
    /** Panel change handler */
    onChange?: (ids: string[]) => void;
    /** Allow to simultaneously open multiple panels */
    allowMultipleExpanded?: boolean;
    /** Allow to simultaneously close all panels */
    allowZeroExpanded?: boolean;
    /** List of expanded panels by default */
    preExpanded?: string[];
}
