import { useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import type { IPopoverContentProps } from '../../types';

export const PopoverContent = ({
    computedZIndex,
    popperStyles,
    attributes,
    ref = null,
    useAnchorWidth,
    referenceElement,
    tabFocusableWrapper,
    dataTestId,
    className,
    popperCSS,
    availableHeight,
    children,
    arrow,
    setPopperElement = null,
}: IPopoverContentProps) => {
    const availableHeightContainer = useRef<HTMLDivElement | null>(null);

    return (
        <div
            ref={mergeRefs([ref, setPopperElement])}
            style={{
                zIndex: computedZIndex,
                width: useAnchorWidth ? referenceElement?.offsetWidth : undefined,
                opacity: 1,
                boxShadow: '0px 4px 24px 0px #26292B40',
                transition: 'opacity .01s ease',
                willChange: 'opacity',
                ...popperStyles?.popper,
                ...(!popperStyles?.popper.transform && {
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

                {arrow}
            </div>
        </div>
    );
};
