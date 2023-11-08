import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

import README from '../README.md';
import CalendarInput from './index';

export default {
    title: 'Controls / CalendarInput',
    component: CalendarInput,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {
        view: 'date',
        rangeBehavior: 'reset',
    },
    argTypes: {
        view: { options: ['date', 'date-time', 'time', 'date-range'], control: { type: 'radio' } },
        rangeBehavior: { options: ['clarification', 'reset'], control: { type: 'radio' } },
    },
} as Meta<typeof CalendarInput>;

export const Basic: StoryObj<ComponentProps<typeof CalendarInput> & { rangeBehavior: 'clarification' | 'reset' }> = {
    render: ({ view, rangeBehavior }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState<string>('');

        return (
            <div style={{ maxWidth: 450 }}>
                <CalendarInput
                    label="Инпут выбора даты"
                    platform="desktop"
                    view={view}
                    picker
                    {...({ rangeBehavior } as any)}
                    value={value}
                    onChange={(_, { value: newValue }) => {
                        setValue(newValue);
                    }}
                />
            </div>
        );
    },
};
