import { Button, emptyCSS } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { Drawer } from './index';

export default {
    title: 'Controls / Drawer',
    component: Drawer,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    argTypes: {
        open: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Is Drawer open',
            required: true,
            control: { type: 'text' },
        },
        timeout: {
            table: {
                type: { summary: 'number' },
            },
            description: 'Animation time',
            defaultValue: {
                summary: 200,
            },
            control: { type: 'number' },
        },
        placement: {
            table: {
                type: { summary: 'string' },
            },
            options: ['right', 'left'],
            defaultValue: {
                summary: 'right',
            },
            control: { type: 'select' },
            summary: 'string',
        },
        contentCSS: {
            table: {
                type: { summary: 'CSSObject' },
            },
            description: 'Styles for Drawer content.',
            summary: 'object',
        },
    },
} as Meta<typeof Drawer>;

const defaultProps: ComponentProps<typeof Drawer> = {
    open: false,
    placement: 'right',
    timeout: 200,
    contentCSS: emptyCSS,
};

export const Basic: StoryObj<ComponentProps<typeof Drawer>> = {
    args: { ...defaultProps },
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
