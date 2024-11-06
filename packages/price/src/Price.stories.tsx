import { defaultTheme } from '@ensi-platform/core-components-common';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { emptyCSS, Price, PriceSizes, PriceVariants, type IPriceProps } from './index';
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
        hideUnit: {
            table: { summary: 'boolean' },
            description: 'Hide unit glyph after price value.',
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
        containerCSS: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional container styles.',
            summary: 'object',
        },
        valueCSS: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional value styles.',
            summary: 'object',
        },
        preTextCSS: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional preText styles.',
            summary: 'object',
        },
        unitCSS: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional unit styles.',
            summary: 'object',
        },
        className: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Additional container styles.<br />Has a higher priority than `containerCSS`.',
            control: { type: 'text' },
            summary: 'string',
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
        unitTypography: {
            table: {
                type: { summary: 'string | CSSObject' },
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

const defaultProps: ComponentProps<typeof Price> = {
    typography: 'bodyMd',
    unitTypography: 'bodyMd',
    variant: 'primary',
    size: 'md',
    preText: undefined,
    unit: undefined,
    value: 100,
    containerCSS: emptyCSS,
    valueCSS: emptyCSS,
    preTextCSS: emptyCSS,
    unitCSS: emptyCSS,
    className: undefined,
    hideUnit: false,
    isCrossed: false,
};

export const Basic: StoryObj<ComponentProps<typeof Price>> = {
    args: {
        ...defaultProps,
        value: 1010,
        preText: 'от',
    },
    render: args => <Price {...args} />,
};

export const Crossed: StoryObj<ComponentProps<typeof Price>> = {
    args: {
        ...defaultProps,
        value: 12500,
        isCrossed: true,
    },
    render: args => <Price {...args} />,
};
