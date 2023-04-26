/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import LoadingSkeleton from './index';

export default {
    title: 'Components / LoadingSkeleton',
    component: LoadingSkeleton,
    parameters: {
        docs: {
            description: {
                // component: README,
            },
        },
        backgrounds: {
            default: 'grey100',
        },
        nextRouter: { query: { page: 2, filter: 'food' } },
    },
} as Meta<typeof LoadingSkeleton>;

export const Basic: StoryObj<ComponentProps<typeof LoadingSkeleton>> = {
    args: {
        height: 40,
        width: 250,
        count: 1,
        duration: 1,
        circle: false,
    },
    render: args => <LoadingSkeleton {...args} />,
};
