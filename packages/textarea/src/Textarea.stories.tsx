import { StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import README from '../README.md';
import { Textarea } from './index';

export default {
    title: 'Components / TextArea',
    component: () => Textarea,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
        backgrounds: {
            default: 'grey100',
        },
    },
};

type Args = ComponentProps<typeof Textarea> & {};

export const Basic: StoryObj<Args> = {
    args: {
        type: 'text',
        size: 'md',
        disabled: false,
        error: '',
        hint: '',
        label: 'Оставьте комментарий',
        labelWrap: true,
        readOnly: false,
        minRows: 3,
        maxRows: 8,
        maxLength: 20,
        isResize: false,
    },
    argTypes: {
        minRows: { control: 'range' },
        maxRows: { control: 'range' },
    },
    render: args => <Textarea {...args} />,
};
