/* eslint-disable react-hooks/rules-of-hooks */
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

import { Button } from '@scripts/gds';

import README from './README.md';
import Drawer from './index';

export default {
    title: 'Components / Drawer',
    component: Drawer,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Drawer>;

export const Basic: StoryObj<ComponentProps<typeof Drawer>> = {
    args: {
        placement: 'left',
        timeout: 300,
    },
    argTypes: {
        placement: { control: { type: 'select', options: ['right', 'left'] } },
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
                <Drawer
                    {...args}
                    open={isOpen}
                    onClose={e => {
                        setOpen(false);
                        action('close')(e);
                    }}
                >
                    <Drawer.Header title="Drawer title" hasCloseButton onClose={() => setOpen(!isOpen)} />
                    <Drawer.Content>Drawer content</Drawer.Content>
                    <Drawer.Footer>
                        <Button onClick={() => setOpen(!isOpen)}>Footer button</Button>
                    </Drawer.Footer>
                </Drawer>
            </div>
        );
    },
};
