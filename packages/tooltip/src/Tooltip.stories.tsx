import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

import Tooltip, { ITooltipProps } from './index';
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
    },
    argTypes: {
        view: {
            options: ['tooltip', 'hint'],
            control: { type: 'radio' },
        },
        trigger: {
            options: ['hover', 'click'],
            control: { type: 'radio' },
        },
        position: {
            options: POSITION_OPTIONS,
            control: { type: 'select' },
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
