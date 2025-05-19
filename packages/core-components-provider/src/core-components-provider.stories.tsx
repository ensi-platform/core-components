import { Button } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import README from '../README.md';
import { CoreComponentsProvider, type ICoreComponentsProviderProps } from './index';

export default {
    title: 'Components / CoreComponentsProvider',
    component: CoreComponentsProvider,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    argTypes: {
        children: {
            table: {
                type: { summary: 'ReactNode' },
            },
            required: true,
            description: "Provider's children.",
        },
    },
} as Meta<ICoreComponentsProviderProps>;

export const Basic: StoryObj<ComponentProps<typeof CoreComponentsProvider>> = {
    render: () => (
        <CoreComponentsProvider>
            <Button theme="outline">Button with custom theme</Button>
        </CoreComponentsProvider>
    ),
};
