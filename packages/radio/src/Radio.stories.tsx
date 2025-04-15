import type { Meta, StoryObj } from '@storybook/react';

import { type ChangeEvent, type ComponentProps, useState } from 'react';

import README from '../README.md';
import { Radio, type RadioProps } from './index';

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
    args: {
        view: 'padded-knob',
    },
    argTypes: {
        view: {
            control: {
                type: 'radio',
                options: ['plain', 'padded-knob'],
            },
        },
    },
} as Meta<RadioProps>;

export const Basic: StoryObj<ComponentProps<typeof Radio>> = {
    args: {},
    render: () => {
        const [value, setValue] = useState('2');

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.currentTarget.value);
        };

        const getProps = (ofValue: string) => ({
            name: 'option',
            value: ofValue,
            checked: value === ofValue,
            onChange: handleChange,
        });

        return (
            <>
                <p>Select an option:</p>
                <Radio
                    {...getProps('1')}
                    label="Option 1"
                    labelCSS={{
                        color: 'gold',
                    }}
                />
                <Radio {...getProps('2')} label="Option 2" disabled allowUnselectDisabledOptions />
                <Radio {...getProps('3')} label="Option 3" disabled allowUnselectDisabledOptions />
                <Radio {...getProps('4')} label="Option 4" />
            </>
        );
    },
};
