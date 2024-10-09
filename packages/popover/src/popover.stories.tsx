import type { Meta, StoryObj } from '@storybook/react';
import { useState, ComponentProps, useRef } from 'react';

import README from '../README.md';
import { Popover } from './index';

export default {
    title: 'Components / Popover',
    component: Popover,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Popover>;

export const Basic: StoryObj<Omit<ComponentProps<typeof Popover>, 'anchorElement' | 'open'>> = {
    args: {
        withTransition: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Обычное применение',
            },
        },
    },
    render: args => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setOpen] = useState(false);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const ref = useRef<HTMLButtonElement>(null);

        return (
            <div>
                <button type="button" onClick={() => setOpen(curr => !curr)} ref={ref}>
                    Open/close
                </button>
                <Popover
                    open={isOpen}
                    anchorElement={ref.current}
                    popperCSS={{
                        boxShadow: 'none',
                        border: 'none',
                        borderRadius: 0,
                        position: 'relative',
                    }}
                    position="right"
                    transitionOptions={{
                        timeout: 200,
                    }}
                    {...args}
                >
                    <div style={{ padding: 12, background: '#ececec' }}>Hello, world!</div>
                </Popover>
            </div>
        );
    },
};
