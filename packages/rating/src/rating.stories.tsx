import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

import README from '../README.md';
import Rating, { RatingProps } from './index';

export default {
    title: 'Controls / Form / Rating',
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
                    label="Оценка"
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
                <p>Выбрано: {value}</p>
                <p>Ховер: {hovered}</p>
            </>
        );
    },
};
