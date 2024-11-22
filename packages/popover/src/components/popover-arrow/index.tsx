import { defaultTheme } from '@ensi-platform/core-components-common';
import type { IPopoverArrowProps } from '../../types'

const { colors } = defaultTheme;

export const PopoverArrow = ({
    popperStyles,
    arrowShift,
    arrowCSS,
    setArrowElement,
}: IPopoverArrowProps) => (
    <div
        ref={setArrowElement}
        style={popperStyles?.arrow}
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
);
