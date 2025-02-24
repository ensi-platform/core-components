import { Button } from '@ensi-platform/core-components-common';
import { Form, FormFieldWrapper, FormReset } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { type ChangeEvent, type ComponentProps, useState } from 'react';

import README from '../README.md';
import { Switcher, type SwitcherProps } from './index';

export default {
    title: 'Components / Switcher',
    component: Switcher,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {},
    argTypes: {},
} as Meta<SwitcherProps>;

export const Basic: StoryObj<ComponentProps<typeof Switcher>> = {
    args: {},
    render: () => {
        const [checked, setChecked] = useState(false);

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            setChecked(e.currentTarget.checked);
        };

        return (
            <>
                <p css={{ marginBottom: 8 }}>Включить оповещения</p>
                <Switcher checked={checked} onChange={handleChange} />
            </>
        );
    },
};

export const WithForm: StoryObj<ComponentProps<typeof Switcher>> = {
    render: () => (
        <Form
            initialValues={{
                activity: false,
            }}
            onSubmit={action('submit')}
        >
            <FormFieldWrapper name="activity">
                <Switcher>Activity</Switcher>
            </FormFieldWrapper>
            <br />

            <br />
            <Button type="submit" size="sm">
                Submit
            </Button>
            <FormReset>Reset</FormReset>
        </Form>
    ),
};
