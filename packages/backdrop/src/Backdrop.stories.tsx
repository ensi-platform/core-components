import { Button } from '@ensi-platform/core-components-common';
import { Portal } from '@ensi-platform/core-components-portal';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { Backdrop, type IBackdropProps } from './index';

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
    argTypes: {
        isOpen: {
            table: {
                type: { summary: 'boolean' },
            },
            required: true,
            description: 'Is component open.',
            defaultValue: {
                summary: false,
            },
            summary: 'boolean',
        },
        invisible: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Makes the backdrop transparent.',
            defaultValue: {
                summary: false,
            },
            summary: 'boolean',
        },
        dataTestId: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Identifier for automated testing systems.',
            summary: 'string',
        },
        timeout: {
            table: {
                type: { summary: 'number' },
            },
            description: 'Animation time',
            defaultValue: {
                summary: 200,
            },
            summary: 'number',
        },
        transitionStyles: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Styles for different states for react-transition-state.',
            summary: 'object',
        },
        zIndex: {
            table: {
                type: { summary: 'number' },
            },
            defaultValue: {
                summary: -1,
            },
            description: 'z-index property for div::after inside backdrop.',
            summary: 'number',
        },
        children: {
            table: {
                type: { summary: 'ReactNode' },
            },
            description: 'Backdrop content.',
            summary: 'ReactNode',
        },
        className: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Additional backdrop styles.',
            control: { type: 'text' },
            summary: 'string',
        },
        onDestroy: {
            table: {
                type: { summary: 'function' },
            },
            description: 'Handler for the end of the animation and the destroying of the component.',
            summary: 'function',
        },
        onClose: {
            table: {
                type: { summary: 'function' },
            },
            description: 'Backdrop click handler.',
            summary: 'function',
        },
    },
} as Meta<IBackdropProps>;

const defaultProps: ComponentProps<typeof Backdrop> = {
    invisible: undefined,
    isOpen: false,
    onDestroy: undefined,
    onClose: undefined,
    dataTestId: undefined,
    timeout: 200,
    zIndex: 10,
    children: undefined,
    className: undefined,
};

export const Basic: StoryObj<ComponentProps<typeof Backdrop>> = {
    args: {
        ...defaultProps,
    },
    render: args => {
        const [isOpen, setOpen] = useState(false);
        return (
            <div style={{ zIndex: 1 }}>
                <Button onClick={() => setOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'} me</Button>
                <Portal>
                    <Backdrop
                        {...args}
                        isOpen={isOpen}
                        onClose={e => {
                            setOpen(false);
                            action('close')(e);
                        }}
                    />
                </Portal>
            </div>
        );
    },
};
