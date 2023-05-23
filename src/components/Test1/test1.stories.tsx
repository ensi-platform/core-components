import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import Test from './test1';

export default {
    title: 'Components / Test1',
    component: Test,
    parameters: {},
} as Meta<typeof Test>;

export const Basic: StoryObj<ComponentProps<typeof Test>> = {
    args: {
        fullWidthScroll: false,
        scrollable: false,
        collapsible: false,
        theme: 'basic',
    },
    parameters: {},
    render: () => <Test />,
};
