import { Button, defaultTheme, scale } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { type IPortalProps, Portal } from './index';

export default {
    title: 'Controls / Portal',
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
            summary: 'ReactNode',
        },
        container: {
            table: {
                type: { summary: 'HTMLElement' },
            },
            description: 'The container into which the child elements will be rendered.',
            summary: 'HTMLElement',
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
            summary: 'boolean',
        },
    },
} as Meta<IPortalProps>;

const defaultProps: ComponentProps<typeof Portal> = {
    immediateMount: false,
};

export const Basic: StoryObj<ComponentProps<typeof Portal>> = {
    args: {
        ...defaultProps,
    },
    render: args => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div>
                <Button onClick={() => setIsOpen(p => !p)}>{isOpen ? 'Hide' : 'Show'} blue circle</Button>
                <br />
                <br />
                <span>{'In this case, the Portal moves the blue circle to <body></body>'}</span>
                <Portal {...args}>
                    <div
                        css={{
                            position: 'fixed',
                            inset: '50%',
                            height: scale(8),
                            width: scale(8),
                            backgroundColor: isOpen ? defaultTheme.colors.primary : 'transparent',
                            borderRadius: '50%',
                        }}
                    />
                </Portal>
            </div>
        );
    },
};
