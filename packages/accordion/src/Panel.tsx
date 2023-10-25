import { HTMLProps, ReactNode, useCallback, useMemo } from 'react';
import {
    AccordionItemPanel as ReactAccordionItemPanel,
    AccordionItemState as ReactAccordionItemState,
} from 'react-accessible-accordion';
import { CSSTransition as CSSTransitionTyped } from 'react-transition-group';

import useAccordion from './useAccordion';

const CSSTransition = CSSTransitionTyped as any;

export interface AccordionPanelProps extends Omit<HTMLProps<HTMLDivElement>, 'ref'> {
    /** Panel content */
    children: ReactNode;
}

export const AccordionPanel = ({ children, ...props }: AccordionPanelProps) => {
    const { animationType, transitionTimeout, transitionTimeoutExit, onEnter, onEntering, onExit, getCSS } =
        useAccordion();

    const handleEnter = useCallback(
        (...args: [HTMLElement, boolean]) => {
            const [instance] = args;
            if (onEnter) {
                onEnter(...args);
            } else if (animationType === 'height') {
                instance.style.height = `0px`;
                instance.style.transition = `height ease ${transitionTimeout}ms`;
            } else if (animationType === 'fadeIn') {
                instance.style.animation = `fade-in ${transitionTimeout}ms ease`;
            }
        },
        [animationType, onEnter, transitionTimeout]
    );

    const handleEntering = useCallback(
        (...args: [HTMLElement, boolean]) => {
            const [instance] = args;
            if (onEntering) {
                onEntering(...args);
            } else if (animationType === 'height' && instance.children[0] instanceof HTMLElement) {
                instance.style.height = `${instance.children[0].offsetHeight}px`;
            }
        },
        [animationType, onEntering]
    );

    const handleExit = useCallback(
        (...args: [HTMLElement]) => {
            const [instance] = args;
            if (onExit) {
                onExit(...args);
            } else if (animationType === 'height') {
                instance.style.height = `0px`;
            } else if (animationType === 'fadeIn') {
                instance.style.animation = ``;
            }
        },
        [animationType, onExit]
    );

    const panelCSS = useMemo(() => getCSS('panel'), [getCSS]);

    return animationType ? (
        <ReactAccordionItemState>
            {({ expanded }) => (
                <CSSTransition
                    in={expanded}
                    timeout={{ enter: transitionTimeout, exit: transitionTimeoutExit }}
                    onEnter={handleEnter}
                    onEntering={handleEntering}
                    onExit={handleExit}
                    unmountOnExit
                >
                    <div
                        css={{
                            overflow: 'hidden',
                            '@keyframes fade-in': {
                                '0%': { opacity: 0 },
                                '100%': { opacity: 1 },
                            },
                        }}
                        {...props}
                    >
                        <ReactAccordionItemPanel css={panelCSS}>{children}</ReactAccordionItemPanel>
                    </div>
                </CSSTransition>
            )}
        </ReactAccordionItemState>
    ) : (
        <ReactAccordionItemPanel css={panelCSS} {...props}>
            {children}
        </ReactAccordionItemPanel>
    );
};

export default AccordionPanel;
