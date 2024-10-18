import { useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { defaultTheme } from '@greensight/core-components-common';

const { colors } = defaultTheme;

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
}) => {
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
    </div>)
};
