import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { CSSObject } from '@emotion/react';
import README from '../README.md';
import { TagItem, Tags, ITagsProps } from '.';

export default {
    title: 'Components / Tags',
    component: Tags,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<ITagsProps>;

const tagStyles: CSSObject = {
    flexShrink: 0,
};

export const Basic: StoryObj<ComponentProps<typeof Tags>> = {
    args: {
        children: [],
        onDelete: num => console.log(`delete${num}`),
        className: '',
        css: undefined,
        CloseIcon: undefined,
        wrap: true,
        disabled: false,
    },

    argTypes: {
        children: {
            description: 'Tag items',
            table: {
                type: { summary: 'ReactNode[]' },
            },
            type: { name: 'array', value: { name: 'other', value: 'ReactNode' }, required: true },
            control: {
                type: null,
            },
        },
        onDelete: {
            description: 'Delete event handler',
            table: {
                type: { summary: 'function' },
            },
            type: { name: 'function', required: true },
            control: {
                type: null,
            },
        },
        CloseIcon: {
            description: 'Close button icon',
            table: {
                defaultValue: { summary: 'IconSmallClosed' },
                type: { summary: 'ReactNode' },
            },
            control: {
                type: null,
            },
        },
        className: {
            description: 'Wrapper class',
            table: {
                type: { summary: 'string' },
            },
            control: {
                type: null,
            },
        },
        css: {
            description: 'Wrapper additional styles',
            table: {
                type: { summary: 'CSSObject' },
            },
            control: {
                type: null,
            },
        },
        disabled: {
            description: 'Selection availability flag',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        wrap: {
            description: 'Allow content to be moved to a new line',
            table: {
                defaultValue: { summary: true },
                type: { summary: 'boolean' },
            },
        },
    },
    render: args => (
        <Tags
            {...args}
            css={{
                overflowX: 'auto',
            }}
        >
            <TagItem css={tagStyles}>Tag #1</TagItem>
            <TagItem css={tagStyles}>Tag #2</TagItem>
            <TagItem css={tagStyles} disabled>
                Tag #3
            </TagItem>
            {Array(20)
                .fill('')
                .map((_, e) => (
                    <TagItem key={e} css={tagStyles}>
                        Tag #{4 + e}
                    </TagItem>
                ))}
        </Tags>
    ),
};
