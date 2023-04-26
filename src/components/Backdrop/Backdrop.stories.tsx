/* eslint-disable react-hooks/rules-of-hooks */
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

import { Button } from '@scripts/gds';

import README from './README.md';
import Backdrop from './index';

export default {
    title: 'Components / Backdrop',
    component: Backdrop,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Backdrop>;

export const Basic: StoryObj<ComponentProps<typeof Backdrop>> = {
    args: {
        invisible: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Story description',
            },
        },
    },
    render: args => {
        const [isOpen, setOpen] = useState(false);
        return (
            <div style={{ zIndex: 1, position: 'relative' }}>
                <Button onClick={() => setOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'} me</Button>
                <Backdrop
                    {...args}
                    open={isOpen}
                    onClose={e => {
                        setOpen(false);
                        action('close')(e);
                    }}
                >
                    Dummy content in background
                </Backdrop>
            </div>
        );
    },
};
