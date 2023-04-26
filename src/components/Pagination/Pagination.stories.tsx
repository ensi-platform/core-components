/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import Pagination from './index';

export default {
    title: 'Components / Pagination',
    component: Pagination,
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
} as Meta<typeof Pagination>;

export const Basic: StoryObj<ComponentProps<typeof Pagination>> = {
    args: {
        pages: 15,
        baseNumberPages: 7,
    },
    render: args => <Pagination {...args} />,
};
