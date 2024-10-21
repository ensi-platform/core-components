import { forwardRef, useState } from 'react';
import { useTransition } from 'react-transition-state';

import { Portal } from '@greensight/core-components-portal';
import { Stack, stackingOrder } from '@greensight/core-components-stack';

import { IPopoverProps, RefElement } from './types';
import { DEFAULT_TRANSITION, extractTransitionDuration, useModifier, usePopover } from './scripts';
import { PopoverContent} from './components/popover-content'

export const Popover = forwardRef<HTMLDivElement, IPopoverProps>(
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
        const [arrowElement, setArrowElement] = useState<RefElement>(null);
        const [popperElement, setPopperElement] = useState<RefElement>(null);

        const setArrowElementFn = (elem: RefElement) => {
            setArrowElement(elem);
        }
        const setPopperElementFn = (elem: RefElement) => {
            setPopperElement(elem);
        }

        const modifiers = useModifier({
            withArrow,
            preventFlip,
            fallbackPlacements,
            preventOverflow,
            availableHeight,
            offset,
            arrowElement,
        })

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
        })

        const transitionDuration = extractTransitionDuration(transitionStatus, transitionOptions);

        const renderContent = (computedZIndex) =>
            <PopoverContent
                computedZIndex={computedZIndex}
                popperStyles={{
                    ...popperStyles,
                    transitionDuration: `${transitionDuration}ms`,
                }}
                attributes={attributes}
                ref={ref}
                useAnchorWidth={useAnchorWidth}
                referenceElement={referenceElement}
                tabFocusableWrapper={tabFocusableWrapper}
                dataTestId={dataTestId}
                className={className}
                popperCSS={popperCSS}
                availableHeight={availableHeight}
                withArrow={withArrow}
                arrowShift={arrowShift}
                arrowCSS={arrowCSS}
                setArrowElement={setArrowElementFn}
                setPopperElement={setPopperElementFn}
            >
                {children}
            </PopoverContent>

        const zeroOpacity = transitionStatus === 'unmounted' ||
            transitionStatus === 'preEnter' ||
            transitionStatus === 'entering' ||
            transitionStatus === 'exited' ||
            transitionStatus === 'exiting'

        const noZeroOpacity = transitionStatus === 'preExit' || transitionStatus === 'entered'

        return (
            <Stack value={zIndex}>
                {computedZIndex => (
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
