import { forwardRef, useState } from 'react';
import { useTransition } from 'react-transition-state';

import { Portal } from '@ensi-platform/core-components-portal';
import { Stack, stackingOrder } from '@ensi-platform/core-components-stack';

import type { IPopoverProps } from './types';
import { DEFAULT_TRANSITION, extractTransitionDuration, useModifier, usePopover } from './scripts';
import { PopoverArrow } from './components/popover-arrow';
import { PopoverContent } from './components/popover-content';

const Popover = forwardRef<HTMLDivElement, IPopoverProps>(
    (
        {
            tabFocusableWrapper,
            children,
            getPortalContainer,
            transitionOptions = DEFAULT_TRANSITION,
            anchorElement,
            useAnchorWidth,
            offset = [0, 0],
            withArrow = false,
            withTransition = false,
            position = 'left',
            preventFlip,
            popperCSS,
            arrowCSS,
            className,
            open,
            dataTestId,
            update,
            zIndex = stackingOrder.POPOVER,
            fallbackPlacements,
            preventOverflow = true,
            availableHeight = false,
        },
        ref
    ) => {
        const [arrowElement, setArrowElement] = useState<HTMLDivElement>();
        const [popperElement, setPopperElement] = useState<HTMLDivElement>();

        const setArrowElementFn = (elem: any) => {
            setArrowElement(elem);
        };
        const setPopperElementFn = (elem: HTMLDivElement | undefined) => {
            setPopperElement(elem);
        };

        const modifiers = useModifier({
            withArrow,
            preventFlip,
            fallbackPlacements,
            preventOverflow,
            availableHeight,
            offset,
            arrowElement,
        });

        const [{ status: transitionStatus, isMounted }, toggle] = useTransition({
            ...transitionOptions,
            unmountOnExit: true,
            mountOnEnter: true,
        });

        const {
            popperStyles,
            attributes,
            arrowShift,
            referenceElement,
        } = usePopover({
            arrowElement,
            anchorElement,
            popperElement,
            position,
            update,
            open,
            modifiers,
            children,
            toggle,
        });

        const transitionDuration = extractTransitionDuration(transitionStatus, transitionOptions);

        const renderArrow = () => (
            withArrow ? (
                <PopoverArrow
                    popperStyles={popperStyles}
                    arrowShift={arrowShift}
                    arrowCSS={arrowCSS}
                    setArrowElement={setArrowElementFn}
                />
            ) : null
        )

        const renderContent = (computedZIndex: number) => (
            <PopoverContent
                computedZIndex={computedZIndex}
                popperStyles={{
                    ...popperStyles,
                    transitionDuration: `${transitionDuration}ms`,
                } as typeof popperStyles}
                attributes={attributes}
                ref={ref}
                useAnchorWidth={useAnchorWidth}
                referenceElement={referenceElement}
                tabFocusableWrapper={tabFocusableWrapper}
                dataTestId={dataTestId}
                className={className}
                popperCSS={popperCSS}
                availableHeight={availableHeight}
                setPopperElement={setPopperElementFn as (elem: HTMLElement | null) => void}
                arrow={renderArrow()}
            >
                {children}
            </PopoverContent>
        );

        const zeroOpacity =
            transitionStatus === 'unmounted' ||
            transitionStatus === 'preEnter' ||
            transitionStatus === 'entering' ||
            transitionStatus === 'exited' ||
            transitionStatus === 'exiting';

        const noZeroOpacity = transitionStatus === 'preExit' || transitionStatus === 'entered';

        return (
            <Stack value={zIndex}>
                {(computedZIndex) => (
                    <Portal getPortalContainer={getPortalContainer}>
                        {withTransition
                            ? isMounted && (
                                <div
                                    css={{
                                        transition: `opacity ${transitionDuration}ms ease`,
                                        ...(zeroOpacity && {
                                            opacity: 0,
                                        }),
                                        ...(noZeroOpacity && {
                                            opacity: 1,
                                        }),
                                    }}
                                >
                                    {renderContent(computedZIndex)}
                                </div>
                            )
                            : open && renderContent(computedZIndex)}
                    </Portal>
                )}
            </Stack>
        );
    }
);

export default Popover;
