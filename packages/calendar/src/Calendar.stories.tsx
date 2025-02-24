import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { Calendar } from './index';

export default {
    title: 'Components / Calendar',
    component: Calendar,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {},
    argTypes: {},
} as Meta<typeof Calendar>;

const minDate = new Date('01.01.2020').getTime();
const maxDate = Date.now();

export const Basic: StoryObj<ComponentProps<typeof Calendar>> = {
    args: {},
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState<number>();

        return (
            <Calendar
                minDate={minDate}
                maxDate={maxDate}
                value={value}
                onChange={e => {
                    setValue(e);
                }}
            />
        );
    },
};
