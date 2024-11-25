import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentProps, useRef } from 'react';

import README from '../README.md';
import { Popover } from './index';
import { POSITION_OPTIONS } from './scripts'

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
    args: {},
    argTypes: {},
} as Meta<typeof Popover>;

export const Basic: StoryObj<Omit<ComponentProps<typeof Popover>, 'anchorElement' | 'open'>> = {
    args: {
        withTransition: true,
        transitionOptions: { timeout: 150 },
        withArrow: false,
        position: "right",
        preventFlip: false,
        preventOverflow: false,
        availableHeight: false,
        useAnchorWidth: false,
        offset: [0, 0],
        zIndex: 1000,
        popperCSS: {},
        arrowCSS: {},
    },
    argTypes: {
        withTransition: {
            description: "Enables or disables the animation when opening or closing the popover. If set to true, an animation will be applied during the popover's appearance and disappearance.",
            control: { type: 'boolean' },
        },
        transitionOptions: {
            description: "Transition options. The default value is { timeout: 150 }.",
            control: { type: 'object' },
        },
        withArrow: {
            description: "Determines whether an arrow should be displayed on the popover, pointing to the anchor element. When set to true, the arrow will be shown.",
            control: { type: 'boolean' },
        },
        position: {
            description: "Controls the position of the popover relative to the anchor element (anchorElement). In this example, the default is \"right\".",
            options: POSITION_OPTIONS,
            control: { type: 'select' },
        },
        preventFlip: {
            description: "Prevents the popover from changing its position if there is not enough space in the specified direction. When set to true, the popover will remain in its specified position.",
            control: { type: 'boolean' },
        },
        preventOverflow: {
            description: "Ensures that the popover stays within the boundaries of the visible screen or container, preventing it from overflowing. If true, the popover will not extend outside the visible area.",
            control: { type: 'boolean' },
        },
        availableHeight: {
            description: "Adjusts the popover’s height based on available screen space. When true, the popover will adapt its height to fit within the screen.",
            control: { type: 'boolean' },
        },
        useAnchorWidth: {
            description: "Uses the width of the anchor element for the popover. If true, the popover’s width will match the width of the anchor element.",
            control: { type: 'boolean' },
        },
        offset: {
            description: "Sets the offset of the popover relative to the anchor element.",
            control: { type: 'object' },
        },
        zIndex: {
            description: "Controls the z-index of the popover, determining its stacking order relative to other elements on the page. The default value in this example is 1000.",
            control: { type: 'number' },
        },
        popperCSS: {
            description: "Allows additional custom styles to be applied to the popover itself. You can pass any CSS properties as part of this object to customize the appearance.",
            control: { type: 'object' },
        },
        arrowCSS: {
            description: "Allows custom styles to be applied to the arrow. Like popperCSS, this property accepts CSS properties to style the arrow's appearance.",
            control: { type: 'object' },
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
