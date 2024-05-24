import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import README from '../README.md';
import { LoadingSkeleton } from './index';

export default {
    title: 'Controls / LoadingSkeleton',
    component: LoadingSkeleton,
    args: {
        height: 40,
        width: 250,
        count: 1,
        duration: 1,
        circle: false,
    },
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof LoadingSkeleton>;

export const Basic: StoryObj<ComponentProps<typeof LoadingSkeleton>> = {
    render: args => <LoadingSkeleton {...args} />,
};
