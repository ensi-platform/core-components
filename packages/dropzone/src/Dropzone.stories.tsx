import { Button, ErrorMessages, scale } from '@ensi-platform/core-components-common';
import { Form, FormFieldWrapper, FormReset } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import type { ComponentProps } from 'react';

import README from '../README.md';
import { Dropzone } from './index';

export default {
    title: 'Components / Dropzone',
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

export const WithForm: StoryObj<ComponentProps<typeof Dropzone>> = {
    render: args => (
        <Form
            initialValues={{ image: [] }}
            validationSchema={Yup.object().shape({
                image: Yup.array().of(Yup.mixed()).min(1, ErrorMessages.REQUIRED),
            })}
            onSubmit={action('onSubmit')}
        >
            <FormFieldWrapper name="image">
                <Dropzone {...args} />
            </FormFieldWrapper>
            <br />
            <div style={{ display: 'flex' }}>
                <Button type="submit" style={{ marginRight: scale(2) }}>
                    Submit
                </Button>
                <FormReset theme="secondary">Reset</FormReset>
            </div>
        </Form>
    ),
};
