import { defaultTokens } from '@greensight/core-components-common';
import { type Meta, type StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Price, PriceSizes, PriceVariants, type IPriceProps } from './index';
import README from '../README.md';

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
    argTypes: {
        value: {
            table: {
                type: { summary: 'number' },
            },
            required: true,
            description: 'Price value.',
            summary: 'number',
        },
        unit: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Text after price value.',
            defaultValue: {
                summary: '₽',
            },
            summary: 'string',
        },
        disableUnit: {
            table: { summary: 'boolean' },
            description: 'Disable text before price value.',
            defaultValue: {
                summary: false,
            },
            summary: 'boolean',
        },
        preText: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Text before price value',
            summary: 'string',
        },
        valueStyles: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional value styles.',
            summary: 'object',
        },
        preTextStyles: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional preText styles.',
            summary: 'object',
        },
        unitStyles: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional unit styles.',
            summary: 'object',
        },
        isCrossed: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Cross all price component.',
            defaultValue: {
                summary: false,
            },
            summary: 'boolean',
        },
        typography: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Typography for price component.',
            options: Object.keys(defaultTokens.typography.styles),
            control: { type: 'select' },
            defaultValue: {
                summary: 'bodyMd',
            },
            summary: 'string',
        },
        variant: {
            table: {
                type: { summary: 'string' },
            },
            options: Object.values(PriceVariants),
            control: { type: 'select' },
            defaultValue: {
                summary: PriceVariants.primary,
            },
            summary: 'string',
        },
        size: {
            table: {
                type: { summary: 'string' },
            },
            options: Object.values(PriceSizes),
            control: { type: 'select' },
            defaultValue: {
                summary: PriceSizes.md,
            },
            summary: 'string',
        },
    },
} as Meta<IPriceProps<any, any>>;

export const Basic: StoryObj<ComponentProps<typeof Price>> = {
    args: {
        value: 1010,
        unit: '₽',
        preText: 'от',
        disableUnit: false,
        variant: 'primary',
        size: 'md',
        typography: 'bodyMd',
        isCrossed: false,
    },
    render: args => <Price {...args} />,
};

export const Crossed: StoryObj<ComponentProps<typeof Price>> = {
    args: {
        value: 12500,
        unit: '₽',
        preText: undefined,
        disableUnit: false,
        variant: 'primary',
        size: 'md',
        typography: 'bodyMd',
        isCrossed: true,
    },
    render: args => <Price {...args} />,
};
