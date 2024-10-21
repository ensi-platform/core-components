import { useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { PopoverArrow } from '../popover-arrow'
import { IPopoverContentProps } from '../../types'

export const PopoverContent = ({
    computedZIndex,
    popperStyles,
    attributes,
    ref,
    useAnchorWidth,
    referenceElement,
    tabFocusableWrapper,
    dataTestId,
    className,
    popperCSS,
    availableHeight,
    withArrow,
    arrowShift,
    arrowCSS,
    children,
    setArrowElement,
    setPopperElement,
}: IPopoverContentProps) => {
    const availableHeightContainer = useRef<HTMLDivElement | null>(null);

    return (<div
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
                <PopoverArrow
                    popperStyles={popperStyles}
                    arrowShift={arrowShift}
                    arrowCSS={arrowCSS}
                    setArrowElement={setArrowElement}
                />
            )}
        </div>
    </div>)
};
