import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import README from '../README.md';
import { Badge } from './index';

export default {
    title: 'Components / Badge',
    component: Badge,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {
        text: 'In progress',
        type: 'warning',
    },
    argTypes: {
        type: {
            options: ['default', 'success', 'warning', 'error', 'created'],
            control: { type: 'radio' },
        },
    },
} as Meta<typeof Badge>;

export const Basic: StoryObj<ComponentProps<typeof Badge>> = {
    args: {},
    render: args => <Badge {...args} />,
};
