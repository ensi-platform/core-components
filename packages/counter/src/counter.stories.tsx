import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

import { Button } from '@ensi-platform/core-components-common';

import README from '../README.md';
import { Counter } from './index';

export default {
    title: 'Controls / Form / Counter',
    component: Counter,
    args: {
        name: 'counter-knobs',
        label: 'Выберите количество товара',
        min: 1,
        max: 999,
        step: 1,
        view: 'horizontal',
        rounded: false,
    },
    argTypes: {
        view: {
            options: ['vertical', 'horizontal'],
            control: {
                type: 'radio',
            },
        },
        step: {
            control: {
                type: 'range',
                min: 0,
                max: 999,
                step: 1,
            },
        },
        max: {
            control: {
                type: 'number',
                max: 999,
                min: 1,
            },
        },
        min: {
            control: {
                type: 'number',
                max: 999,
                min: 1,
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Counter>;

export const Basic: StoryObj<ComponentProps<typeof Counter>> = {
    render: args => <Counter {...args} />,
};

export const Controlled: StoryObj<ComponentProps<typeof Counter>> = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: 'Использование счетчика без дополнительной логики, т.е. вся логика по управлению компонента, зашита внутри компонента.',
            },
        },
    },
    render: () => {
        const CounterExample = () => {
            const [value, setValue] = useState(1);
            return (
                <>
                    <Button css={{ marginRight: '12px' }} theme="secondary" onClick={() => setValue(5)}>
                        Set 5
                    </Button>
                    <Counter
                        name="counter-controlled"
                        label="Выберите количество товара"
                        value={value}
                        onChange={newValue => setValue(newValue)}
                    />
                </>
            );
        };
        return <CounterExample />;
    },
};

export const Custom: StoryObj<ComponentProps<typeof Counter>> = {
    args: {
        name: 'custom',
        label: 'Укажите количество записей',
        min: 2,
        max: 999,
        step: 2,
        value: 4,
    },
    parameters: {
        docs: {
            description: {
                story: 'Пример счетчика с кастомными параметрами.',
            },
        },
    },
    render: args => <Counter {...args} />,
};

export const Vertical: StoryObj<ComponentProps<typeof Counter>> = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: 'Использование счетчика с вертикальным отображением.',
            },
        },
    },
    render: () => <Counter name="counter-vertical" label="Выберите количество товара" view="vertical" />,
};
