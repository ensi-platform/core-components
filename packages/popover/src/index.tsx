import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import { ModifierArguments, Obj } from '@popperjs/core';
import maxSize from 'popper-max-size-modifier';
import { CSSProperties, forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { usePopper } from 'react-popper';
import { useTransition, TransitionOptions, TransitionStatus } from 'react-transition-state';

import { Portal } from '@greensight/core-components-portal';
import { Stack, stackingOrder } from '@greensight/core-components-stack';

import { defaultTheme } from '@greensight/core-components-common';

import { IPopoverProps, RefElement, IPopperModifier } from './types';
import { DEFAULT_TRANSITION, MIN_ARROW_SHIFT_SIZE } from './scripts';

const { colors } = defaultTheme;

const extractTransitionDuration = (status: TransitionStatus, options: TransitionOptions) => {
    if (status === 'unmounted') return 0;
    if (typeof options.timeout === 'number' || !options.timeout) return options.timeout || 0;

    if (status === 'exited' || status === 'exiting') return options.timeout.exit || 0;

    return options.timeout.enter || 0;
};

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
        const [referenceElement, setReferenceElement] = useState<RefElement>(anchorElement);
        const [popperElement, setPopperElement] = useState<RefElement>(null);
        const [arrowElement, setArrowElement] = useState<RefElement>(null);
        const [arrowShift, setArrowShift] = useState(false);

        const updatePopperRef = useRef<() => void>();

        const availableHeightContainer = useRef<HTMLDivElement | null>(null);

        const availableHieghtModifier = useMemo(
            () => ({
                name: 'availableHeight',
                enabled: true,
                phase: 'beforeWrite',
                requires: ['maxSize'],
                fn({
                    state: {
                        modifiersData,
                        elements: { popper },
                    },
                }: ModifierArguments<Obj>) {
                    const { height } = modifiersData.maxSize;

                    const content = popper.querySelector('.scrollable-content') as HTMLElement;
                    // const content = availableHeightContainer.current;

                    if (content && !content.style.maxHeight) {
                        content.style.maxHeight = `${height}px`;
                    }
                },
            }),
            []
        );

        const modifiers = useMemo(() => {
            const result: IPopperModifier[] = [{ name: 'offset', options: { offset } }];

            if (withArrow) {
                result.push({ name: 'arrow', options: { element: arrowElement } });
            }

            if (preventFlip) {
                result.push({ name: 'flip', options: { fallbackPlacements: [] } });
            }

            if (fallbackPlacements) {
                result.push({ name: 'flip', options: { fallbackPlacements } });
            }

            if (preventOverflow) {
                result.push({
                    name: 'preventOverflow',
                    options: { mainAxis: false },
                });
            }

            if (availableHeight) {
                result.push({ ...maxSize, options: {} });
                result.push({ ...availableHieghtModifier, options: {} });
            }

            return result;
        }, [
            offset,
            withArrow,
            preventFlip,
            fallbackPlacements,
            preventOverflow,
            availableHeight,
            arrowElement,
            availableHieghtModifier,
        ]);

        const {
            styles: popperStyles,
            attributes,
            update: updatePopper,
        } = usePopper(referenceElement, popperElement, {
            placement: position,
            modifiers,
        });

        if (updatePopper) {
            updatePopperRef.current = updatePopper;
        }

        useEffect(() => {
            setReferenceElement(anchorElement);
        }, [anchorElement]);

        useEffect(() => {
            if (updatePopper) {
                updatePopper();
            }
        }, [updatePopper, arrowElement, children]);

        if (update && !update.current && updatePopper) {
            // eslint-disable-next-line no-param-reassign
            update.current = updatePopper;
        }

        useEffect(() => {
            // Dirty hack to force popover to fit the anchor position
            const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
            const observer = new ResizeObserver(() => {
                const event = new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: false,
                    view: window,
                });

                anchorElement?.dispatchEvent(event);
                updatePopperRef.current?.();
            });

            if (anchorElement) {
                observer.observe(anchorElement);
            }

            return () => {
                observer.disconnect();
            };
        }, [anchorElement]);

        /**
         * По дизайну, если у тултипа позиционирование -start/-end, то стрелочка немного сдвигается вбок.
         * Но если anchorElement слишком маленький, то стрелочка сдвигаться не должна.
         */
        useEffect(() => {
            const shiftedPosition = position.includes('-start') || position.includes('-end');

            if (shiftedPosition && referenceElement) {
                const { width, height } = referenceElement.getBoundingClientRect();

                const size = position.includes('left') || position.includes('right') ? height : width;

                if (size >= MIN_ARROW_SHIFT_SIZE) {
                    setArrowShift(true);
                }
            }
        }, [referenceElement, position]);

        const renderContent = (
            computedZIndex: number,
            style?: { transitionDuration: CSSProperties['transitionDuration'] }
        ) => (
            <div
                ref={mergeRefs([ref, setPopperElement])}
                style={{
                    zIndex: computedZIndex,
                    width: useAnchorWidth ? referenceElement?.offsetWidth : undefined,
                    opacity: 1,
                    transition: 'opacity .01s ease',
                    willChange: 'opacity',
                    ...popperStyles.popper,
                    ...(!popperStyles.popper.transform && {
                        opacity: 0,
                    }),
                }}
                {...(!tabFocusableWrapper && {
                    tabIndex: -1,
                })}
                data-test-id={dataTestId}
                className={className}
                {...attributes.popper}
            >
                <div
                    css={{
                        position: 'relative',
                        willChange: 'transform',
                        transitionProperty: 'opacity, transform',
                        transitionTimingFunction: 'ease-in-out',
                        ...popperCSS,
                    }}
                    style={style}
                >
                    <div
                        css={{
                            ...(availableHeight && {
                                position: 'relative',
                                zIndex: 2,
                                overflowY: 'auto',
                            }),
                        }}
                        ref={availableHeightContainer}
                        className="scrollable-content"
                    >
                        {children}
                    </div>

                    {withArrow && (
                        <div
                            ref={setArrowElement}
                            style={popperStyles.arrow}
                            css={{
                                zIndex: 1,
                                ':after': {
                                    content: "''",
                                    display: 'block',
                                    position: 'absolute',
                                    width: 12,
                                    height: 12,
                                    border: `0px solid ${colors.white}`,
                                    borderWidth: '0 8px 8px',
                                    transform: 'rotate(45deg)',
                                },
                                '[data-popper-placement="left"] &, [data-popper-placement="left-start"] &, [data-popper-placement="left-end"] &':
                                    {
                                        right: 5,
                                        '&:after': {
                                            top: -6,
                                            borderBottom: 'none',
                                            borderLeft: 'none',
                                        },
                                    },
                                ...(arrowShift && {
                                    "[data-popper-placement='bottom-start'] &": {
                                        ':after': {
                                            left: -17,
                                        },
                                    },
                                    "[data-popper-placement='left-start'] &": {
                                        ':after': {
                                            top: -7,
                                        },
                                    },
                                    "[data-popper-placement='left-end'] &": {
                                        ':after': {
                                            top: -5,
                                        },
                                    },
                                    "[data-popper-placement='bottom-end'] &": {
                                        ':after': {
                                            left: 5,
                                        },
                                    },
                                }),
                                ...arrowCSS,
                            }}
                        />
                    )}
                </div>
            </div>
        );

        const [{ status: transitionStatus, isMounted }, toggle] = useTransition({
            ...transitionOptions,
            unmountOnExit: true,
            mountOnEnter: true,
        });

        useEffect(() => {
            toggle(open);
        }, [open]);

        const transitionDuration = extractTransitionDuration(transitionStatus, transitionOptions);

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
                                      {renderContent(computedZIndex, { transitionDuration: `${transitionDuration}ms` })}
                                  </div>
                              )
                            : open && renderContent(computedZIndex)}
                    </Portal>
                )}
            </Stack>
        );
    }
);
