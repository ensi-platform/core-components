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
                setArrowElement={setArrowElement}
                setPopperElement={setPopperElement}
            >
                {children}
            </PopoverContent>

        return (
            <Stack value={zIndex}>
                {computedZIndex => (
                    <Portal getPortalContainer={getPortalContainer}>
                        {withTransition
                            ? isMounted && (
                                  <div
                                      css={{
                                          transition: `opacity ${transitionDuration}ms ease`,
                                          ...((transitionStatus === 'unmounted' ||
                                              transitionStatus === 'preEnter' ||
                                              transitionStatus === 'entering' ||
                                              transitionStatus === 'exited' ||
                                              transitionStatus === 'exiting') && {
                                              opacity: 0,
                                          }),
                                          ...((transitionStatus === 'preExit' || transitionStatus === 'entered') && {
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
