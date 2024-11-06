import { useMemo } from 'react';

import { Accordion as ReactAccordion } from 'react-accessible-accordion';
import { IconArrowDown, useThemeCSSPart } from '@ensi-platform/core-components-common';
import { AccordionContext } from './scripts/useAccordion';
import { AccordionItem as Item } from './components/Item';
import { AccordionHeading as Heading } from './components/Heading';
import { AccordionPanel as Panel } from './components/Panel';
import { AccordionButton as Button } from './components/Button';
import { AccordionProps, AccordionState, AccordionThemeState } from './types';
import { accordionThemes } from './themes/defaultTheme';

const BasicAccordion = ({
    children,
    allowMultipleExpanded = true,
    allowZeroExpanded = true,
    preExpanded,
    onChange,
    Icon = IconArrowDown,
    animationType,
    transitionTimeout = 300,
    transitionTimeoutExit = transitionTimeout,
    onEnter,
    onEntering,
    onExit,
    theme = accordionThemes.basic,
    size = 'md',
    variant = 'primary',
    ...props
}: AccordionProps) => {
    const state = useMemo<AccordionState>(
        () => ({
            animationType,
            Icon,
            transitionTimeout,
            transitionTimeoutExit,
        }),
        [animationType, Icon, transitionTimeout, transitionTimeoutExit]
    );

    const themeState = useMemo<AccordionThemeState>(
        () => ({
            ...state,
            size,
            variant,
        }),
        [state, size, variant]
    );

    const getCSS = useThemeCSSPart(theme, themeState);
    const containerCSS = useMemo(() => getCSS('container'), [getCSS]);

    const contextValue = useMemo(
        () => ({
            Icon,
            animationType,
            transitionTimeout,
            transitionTimeoutExit,
            onEnter,
            onEntering,
            onExit,
            theme,
            getCSS,
        }),
        [Icon, animationType, transitionTimeout, transitionTimeoutExit, onEnter, onEntering, onExit, theme, getCSS]
    );

    return (
        <AccordionContext.Provider value={contextValue}>
            <ReactAccordion
                allowMultipleExpanded={allowMultipleExpanded}
                allowZeroExpanded={allowZeroExpanded}
                preExpanded={preExpanded}
                onChange={onChange}
                css={containerCSS}
                {...props}
            >
                {children}
            </ReactAccordion>
        </AccordionContext.Provider>
    );
};

export const Accordion = Object.assign(BasicAccordion, {
    Item,
    Heading,
    Button,
    Panel,
});
