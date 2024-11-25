import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, useState } from 'react';

import Tooltip from './index';
import { type ITooltipProps } from './types';
import { POSITION_OPTIONS } from './scripts';
import README from '../README.md';

export default {
    title: 'Components / Tooltip',
    component: Tooltip,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {},
    argTypes: {},
} as Meta<ITooltipProps>;

export const Basic: StoryObj<ComponentProps<typeof Tooltip> & { offsetX: number; offsetY: number }> = {
    args: {
        trigger: 'hover',
        offsetX: 0,
        offsetY: 16,
        position: 'left',
        view: 'tooltip',
        zIndex: 1000,
        useAnchorWidth: false,
        preventOverflow: true,
        availableHeight: true,
        fallbackPlacements: ['bottom', 'top'],
    },
    argTypes: {
        view: {
            options: ['tooltip', 'hint'],
            control: { type: 'radio' },
            description: 'Defines the type of tooltip. "tooltip" is used for standard tooltips, while "hint" provides more contextual information.',
        },
        offsetX: {
            control: { type: 'number' },
            description: 'Horizontal offset of the tooltip relative to its anchor element. Positive values move the tooltip to the right, and negative values move it to the left.',
        },
        offsetY: {
            control: { type: 'number' },
            description: 'Vertical offset of the tooltip relative to its anchor element. Positive values move the tooltip downward, and negative values move it upward.',
        },
        trigger: {
            options: ['hover', 'click'],
            control: { type: 'radio' },
            description: 'Specifies the event that triggers the tooltip to open. Options include "hover" or "click".',
        },
        position: {
            options: POSITION_OPTIONS,
            control: { type: 'select' },
            description: 'Determines the position of the tooltip relative to the anchor element. Options include "top", "bottom", "left", and "right".',
        },
        zIndex: {
            control: { type: 'number' },
            description: 'Sets the z-index of the tooltip, controlling its stack order relative to other elements.',
        },
        useAnchorWidth: {
            control: { type: 'boolean' },
            description: 'If true, the tooltip will match the width of the anchor element.',
        },
        preventOverflow: {
            control: { type: 'boolean' },
            description: 'Prevents the tooltip from repositioning itself to fit within the screen if there is not enough space.',
        },
        availableHeight: {
            control: { type: 'boolean' },
            description: 'Allows the tooltip to adjust its height to fit within the available screen space if its content is too large.',
        },
        fallbackPlacements: {
            control: { type: 'select', options: ['top', 'bottom', 'left', 'right'] },
            description: 'Alternative positions for the tooltip if it does not fit in the original position.',
        },
    },
    render: args => {
        const [open, setOpen] = useState(false);
        const handleOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };

        return (
            <div
                css={{
                    width: '100%',
                    height: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Tooltip
                    {...args}
                    open={open}
                    content={
                        <div>
                            Tooltip content! Hey hey <strong>hello</strong>
                        </div>
                    }
                    offset={[args.offsetX, args.offsetY]}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    fallbackPlacements={['bottom', 'top']}
                >
                    <div css={{ padding: '16px', border: '1px dashed rgba(0, 0, 0, 0.1)' }}>Подробнее</div>
                </Tooltip>
            </div>
        );
    },
};
