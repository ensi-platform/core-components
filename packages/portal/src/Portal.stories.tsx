import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps } from 'react';

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
        container: {
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
            control: false,
        },
    },
} as Meta<IPortalProps>;

export const Basic: StoryObj<ComponentProps<typeof Portal>> = {
    args: {
        immediateMount: false,
    },
};
