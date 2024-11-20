import { Button, scale } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { BaseModal } from './index';

export default {
    title: 'Components / BaseModal',
    component: BaseModal,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof BaseModal>;

export const Basic: StoryObj<ComponentProps<typeof BaseModal>> = {
    args: {
        backdropProps: {
            invisible: false,
        },

        timeout: 200,
    },
    parameters: {
        docs: {
            description: {
                story: 'Story description',
            },
        },
    },
    render: args => {
        const [isOpen, setOpen] = useState(false);
        const handleModalOpen = () => setOpen(!isOpen);
        return (
            <div style={{ zIndex: 1, position: 'relative' }}>
                <Button onClick={handleModalOpen}>{isOpen ? 'Close' : 'Open'} me</Button>
                <BaseModal {...args} open={isOpen} onClose={() => setOpen(false)} css={{ height: scale(50) }}>
                    <div style={{ padding: '100px', background: '#fafafa' }}>
                        <span css={{ display: 'block' }}>BaseModal content!</span>
                    </div>
                </BaseModal>
            </div>
        );
    },
};
