import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps } from 'react';

import { Skip, type SkipProps } from '.';
import README from '../README.md';

export default {
    title: 'Components / Skip',
    component: Skip,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {},
    argTypes: {},
} as Meta<SkipProps>;

export const Basic: StoryObj<ComponentProps<typeof Skip>> = {
    args: {},
    render: () => <Skip link="#main">К основному контенту</Skip>,
};
