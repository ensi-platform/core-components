import { Button, emptyCSS } from '@ensi-platform/core-components-common';
import { Form, FormFieldWrapper, FormReset } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { type ChangeEvent, type ComponentProps, useRef, useState } from 'react';

import README from '../README.md';
import { FormRadio, type IRadioProps, Radio, RadioSizesEnum, RadioVariantsEnum } from './index';

export default {
    title: 'Components / Radio',
    component: Radio,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    argTypes: {
        checked: {
            table: { type: { summary: 'boolean' } },
            description: 'Is radio selected.',
            defaultValue: { summary: false },
        },
        disabled: {
            table: { type: { summary: 'boolean' } },
            description: 'Is radio disabled.',
            defaultValue: { summary: false },
        },
        error: {
            table: { type: { summary: 'string' } },
            description: 'Error message',
            defaultValue: { summary: '' },
        },
        inputRef: {
            table: { type: { summary: 'Ref<HTMLInputElement>' } },
            description: 'Ref for inner `<input />`',
        },
        className: {
            table: { type: { summary: 'string' } },
            description: 'Additional container styles.<br />Has a higher priority than `containerCSS` prop',
        },
        label: {
            table: { type: { summary: 'string' } },
            description: 'Label value',
            defaultValue: { summary: '' },
        },
        containerCSS: {
            table: { type: { summary: 'CSSObject' } },
            description: 'Additional container styles',
        },
        labelCSS: {
            table: { type: { summary: 'CSSObject' } },
            description: 'Additional label styles',
        },
        inputCSS: {
            table: { type: { summary: 'CSSObject' } },
            description: 'Additional input styles',
        },
        radioCSS: {
            table: { type: { summary: 'CSSObject' } },
            description: 'Additional radio styles',
        },
        errorCSS: {
            table: { type: { summary: 'CSSObject' } },
            description: 'Additional error styles',
        },
        useControlHook: {
            table: {
                type: { summary: 'useCheckboxLikeControlHookType' },
            },
            description: 'Custom hook for controlling the radio state.',
            defaultValue: { summary: 'useCheckboxLikeControlHookRHF' },
        },
        variant: {
            table: {
                type: { summary: 'string' },
            },
            options: Object.values(RadioVariantsEnum),
            control: { type: 'select' },
            defaultValue: {
                summary: RadioVariantsEnum.primary,
            },
            summary: 'string',
        },
        size: {
            table: {
                type: { summary: 'string' },
            },
            options: Object.values(RadioSizesEnum),
            control: { type: 'select' },
            defaultValue: {
                summary: RadioSizesEnum.md,
            },
            summary: 'string',
        },
    },
} as Meta<IRadioProps<typeof RadioVariantsEnum, typeof RadioSizesEnum>>;

const defaultProps: ComponentProps<typeof Radio> = {
    checked: false,
    disabled: false,
    error: '',
    className: undefined,
    label: '',
    containerCSS: emptyCSS,
    labelCSS: emptyCSS,
    inputCSS: emptyCSS,
    radioCSS: emptyCSS,
    errorCSS: emptyCSS,
    useControlHook: undefined,
    variant: 'primary',
    size: 'md',
};

export const Basic: StoryObj<ComponentProps<typeof Radio>> = {
    args: {
        ...defaultProps,
        value: 'Label',
    },
    render: args => {
        const [selectedValue, setSelectedValue] = useState<string | null>(null);

        const testRef = useRef<HTMLInputElement>(null);

        const onChange = (event: ChangeEvent<HTMLInputElement>) => {
            setSelectedValue(event.target.value);
        };

        return (
            <>
                <Radio
                    {...args}
                    label="Label"
                    name="control"
                    checked={selectedValue === args.value}
                    onChange={onChange}
                    ref={testRef}
                />
                <br />
                <br />
                <div>
                    <Button type="button" onClick={() => setSelectedValue(null)}>
                        Reset radio
                    </Button>
                </div>
            </>
        );
    },
};

export const WithForm: StoryObj<ComponentProps<typeof Radio>> = {
    render: () => (
        <Form
            initialValues={{
                side: null,
            }}
            onSubmit={action('submit')}
        >
            <FormFieldWrapper name="side" value="right">
                <FormRadio label="use right side" />
            </FormFieldWrapper>

            <FormFieldWrapper name="side" value="left">
                <FormRadio label="use left side" />
            </FormFieldWrapper>

            <FormFieldWrapper name="side" value="top">
                <FormRadio label="use top side" />
            </FormFieldWrapper>

            <FormFieldWrapper name="side" value="bottom">
                <FormRadio label="use bottom side" />
            </FormFieldWrapper>

            <br />
            <br />
            <Button type="submit">Submit</Button>
            <br />
            <br />
            <FormReset>Reset</FormReset>
        </Form>
    ),
};
