import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import README from '../README.md';
import Loader from './index';

export default {
    title: 'Controls / Loader',
    component: Loader,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Loader>;

export const Basic: StoryObj<ComponentProps<typeof Loader>> = {
    args: {},
    render: () => <Loader />,
};
