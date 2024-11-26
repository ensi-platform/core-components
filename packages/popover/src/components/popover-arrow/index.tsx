import { defaultTheme } from '@ensi-platform/core-components-common';

import type { IPopoverArrowProps } from '../../types';

const { colors } = defaultTheme;

export const PopoverArrow = ({ popperStyles, arrowShift, arrowCSS, setArrowElement }: IPopoverArrowProps) => (
    <div
        ref={setArrowElement}
        style={popperStyles?.arrow}
        css={{
            zIndex: 1,
            ':after': {
                content: "''",
                display: 'block',
                position: 'absolute',
                top: -6,
                width: 12,
                height: 12,
                backgroundColor: colors.white,
                transform: 'rotate(45deg)',
                ...arrowCSS,
            },
            '[data-popper-placement="left"] &, [data-popper-placement="left-start"] &, [data-popper-placement="left-end"] &':
                {
                    right: 6,
                },
            '[data-popper-placement="right"] &, [data-popper-placement="right-start"] &, [data-popper-placement="right-end"] &':
                {
                    left: -6,
                },
            ...(arrowShift && {
                "[data-popper-placement='bottom-start'] &, [data-popper-placement='top-start'] &": {
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
        }}
    />
);
