import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';


import README from '../README.md';
import Block from './index';

export default {
    title: 'Components / Block',
    component: Block,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {},
    argTypes: {},
} as Meta<typeof Block>;

export const Basic: StoryObj<ComponentProps<typeof Block>> = {
    args: {},
    render: () => (
        <Block>
            <Block.Header>Header</Block.Header>
            <Block.Body>Body</Block.Body>
            <Block.Footer>Footer</Block.Footer>
        </Block>
    ),
};
