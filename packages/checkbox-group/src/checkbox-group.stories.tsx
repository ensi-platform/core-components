import { Checkbox } from '@ensi-platform/core-components-checkbox';

import type { Meta, StoryObj } from '@storybook/react';

import { ComponentProps, useState } from 'react';

import README from '../README.md';
import { CheckboxGroup } from './index';

export default {
    title: 'Controls / Form / CheckboxGroup',
    component: CheckboxGroup,
    args: { label: 'Выберите вариант', hint: 'Подсказка' },
    parameters: {
        docs: {
            description: {
                component: README,
            },
            inlineStories: true,
        },
    },
} as Meta<typeof CheckboxGroup>;

export const Basic: StoryObj<ComponentProps<typeof CheckboxGroup>> = {
    render: args => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState<string[]>([]);

        return (
            <CheckboxGroup
                name="checkbox-group"
                field={{
                    value,
                    onChange: event => {
                        // @ts-ignore
                        setValue([...event.target.value]);
                    },
                }}
                {...args}
            >
                <Checkbox value="first">Вариант 1</Checkbox>
                <Checkbox value="second">Вариант 2</Checkbox>
                <Checkbox value="third">Вариант 3</Checkbox>
                <Checkbox value="fourth" disabled>
                    Вариант 4 (отключен)
                </Checkbox>
            </CheckboxGroup>
        );
    },
};
