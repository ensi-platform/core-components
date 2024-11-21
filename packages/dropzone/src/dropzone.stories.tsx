import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import README from '../README.md';
import { Dropzone } from './index';

export default {
    title: 'Controls / Dropzone',
    component: Dropzone,
    args: {
        onFilesChange: action('change'),
        onFileRemove: action('file remove'),
        disabled: false,
        isDragDisabled: false,
        simple: false,
        accept: ['image/jpeg', 'image/jpg', 'image/png'],
        maxFiles: 10,
        maxFileSize: 1000000,
    },
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Dropzone>;

export const ControlsWithPreloadedFile: StoryObj<ComponentProps<typeof Dropzone>> = {
    render: args => <Dropzone {...args} />,
};
