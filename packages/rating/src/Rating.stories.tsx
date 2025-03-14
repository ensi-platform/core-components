import { Button, scale } from '@ensi-platform/core-components-common';
import { Form, FormFieldWrapper, FormReset } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { Rating, type RatingProps } from './index';

export default {
    title: 'Components / Rating',
    component: Rating,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {
        precision: 0.5,
    },
    argTypes: {},
} as Meta<RatingProps>;

export const Basic: StoryObj<ComponentProps<typeof Rating>> = {
    args: {},
    render: args => {
        const [value, setValue] = useState(3.5);
        const [hovered, setHovered] = useState(0);

        return (
            <>
                <Rating
                    size="lg"
                    label="Score"
                    value={value}
                    onChange={e => {
                        setValue(e.target.value);
                    }}
                    onHoverChange={(_, { value }) => {
                        setHovered(value);
                    }}
                    name="score"
                    {...args}
                />
                <p>Chosen: {value}</p>
                <p>Hover: {hovered}</p>
            </>
        );
    },
};

export const WithForm: StoryObj<ComponentProps<typeof Rating>> = {
    args: {},
    render: args => (
        <div style={{ width: 500, minHeight: 800 }}>
            <Form
                initialValues={{ rating: 5 }}
                validationSchema={Yup.object().shape({
                    rating: Yup.number().min(5, 'Give us 5 points').required('Required field'),
                })}
                onSubmit={action('onSubmit')}
            >
                <FormFieldWrapper name="rating" label="Rating">
                    <Rating {...args} />
                </FormFieldWrapper>
                <br />
                <Button type="submit" style={{ marginRight: scale(2) }}>
                    Submit
                </Button>
                <FormReset theme="secondary">Reset</FormReset>
            </Form>
        </div>
    ),
};
