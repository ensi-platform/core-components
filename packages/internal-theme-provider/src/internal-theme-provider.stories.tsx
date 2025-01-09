import { Button } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import README from '../README.md';
import { type IInternalThemeProviderProps, InternalThemeProvider } from './index';

export default {
    title: 'Components / InternalThemeProvider',
    component: InternalThemeProvider,
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
} as Meta<IInternalThemeProviderProps>;

export const Basic: StoryObj<ComponentProps<typeof InternalThemeProvider>> = {
    render: () => (
        <InternalThemeProvider>
            <Button theme="outline">Button with custom theme</Button>
        </InternalThemeProvider>
    ),
};
