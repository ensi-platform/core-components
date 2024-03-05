import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { CSSObject } from '@emotion/react';
import README from '../README.md';
import Tags, { TagsProps } from '.';

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
    args: {
        wrap: true,
    },
    argTypes: {},
} as Meta<TagsProps>;

const tagStyles: CSSObject = {
    flexShrink: 0,
};

export const Basic: StoryObj<ComponentProps<typeof Tags>> = {
    args: {},
    render: args => (
        <Tags
            {...args}
            onDelete={num => alert(`delete${num}`)}
            css={{
                overflowX: 'auto',
            }}
        >
            <Tags.Tag css={tagStyles}>Tag #1</Tags.Tag>
            <Tags.Tag css={tagStyles}>Tag #2</Tags.Tag>
            <Tags.Tag css={tagStyles} disabled>Tag #3</Tags.Tag>
            {Array(20)
                .fill('')
                .map((_, e) => (
                    <Tags.Tag key={e} css={tagStyles}>Tag #{4 + e}</Tags.Tag>
                ))}
        </Tags>
    ),
};
