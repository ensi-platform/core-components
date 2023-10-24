// eslint-disable-next-line no-use-before-define
import React, { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import README from '../README.md';
import CopyButton from './index';

export default {
    title: 'Components / CopyButton',
    component: CopyButton,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {},
    argTypes: {},
} as Meta<typeof CopyButton>;

export const Basic: StoryObj<ComponentProps<typeof CopyButton>> = {
    args: {
        children: 'Текст',
    },
    render: args => <CopyButton {...args} />,
};
