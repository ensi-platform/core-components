import { defaultTheme } from '@greensight/core-components-common';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import README from '../README.md';
import definePrice, { PriceProps } from './index';

const Price = definePrice(defaultTheme, 'bodyMdBold', 'danger');

export default {
    title: 'Components / Price',
    component: Price,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {
        typography: 'bodyMdBold',
        price: 10,
        pretext: 'от',
        isCrossed: true,
    },
    argTypes: {
        typography: {
            control: {
                type: 'radio',
                options: Object.keys(defaultTheme.tokens.typography.styles),
            },
        },
    },
} as Meta<PriceProps<any, any>>;

export const Basic: StoryObj<ComponentProps<typeof Price>> = {
    args: {},
    render: args => <Price {...args} />,
};
