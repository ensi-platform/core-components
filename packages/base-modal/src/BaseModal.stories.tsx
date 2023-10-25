import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

import { Button } from '@greensight/core-components-common';

import README from '../README.md';
import BaseModal from './index';

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
        timeout: 2000,
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
                <BaseModal {...args} open={isOpen} onClose={() => setOpen(false)}>
                    <div style={{ padding: '100px', background: '#fafafa' }}>BaseModal content!</div>
                </BaseModal>
            </div>
        );
    },
};
