import { Backdrop } from '@ensi-platform/core-components-backdrop';
import { Button } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { type IPortalProps, Portal } from './index';

export default {
    title: 'Components / Portal',
    component: Portal,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    argTypes: {
        children: {
            table: {
                type: { summary: 'ReactNode' },
            },
            required: true,
            description: 'Portal content.',
        },
        getPortalContainer: {
            table: {
                type: { summary: 'Element' },
            },
            description: 'The container into which the child elements will be rendered.',
        },
        immediateMount: {
            table: {
                type: { summary: 'boolean' },
            },
            defaultValue: {
                summary: false,
            },
            description:
                'Render the child elements immediately.<br />false - the content will be rendered to the next render',
        },
    },
} as Meta<IPortalProps>;

const defaultProps: ComponentProps<typeof Portal> = {
    children: undefined,
    getPortalContainer: undefined,
    immediateMount: false,
};

export const Basic: StoryObj<ComponentProps<typeof Portal>> = {
    args: {
        ...defaultProps,
    },
    render: args => {
        const [isOpen, setOpen] = useState(false);
        return (
            <div style={{ zIndex: 1 }}>
                <Button onClick={() => setOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'} backdrop</Button>
                <Portal {...args}>
                    <Backdrop
                        isOpen={isOpen}
                        zIndex={10}
                        onClose={() => {
                            setOpen(false);
                        }}
                    />
                </Portal>
            </div>
        );
    },
};
