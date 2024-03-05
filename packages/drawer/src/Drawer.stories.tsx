import { ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@greensight/core-components-common';

import README from '../README.md';
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
    args: {},
    argTypes: {},
} as Meta<typeof Drawer>;

export const Basic: StoryObj<ComponentProps<typeof Drawer>> = {
    args: {
        placement: 'right',
        timeout: 300,
    },
    argTypes: {
        placement: {
            options: ['right', 'left'],
            control: {
                type: 'radio',
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
                    onClose={() => {
                        setOpen(false);
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
