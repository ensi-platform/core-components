import { Button } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import README from '../README.md';
import { InternalLanguageProvider } from './index';
import i18n from './scripts/i18n';
import type { IInternalLanguageProviderProps } from './types';

export default {
    title: 'Components/InternalLanguageProvider',
    component: InternalLanguageProvider,
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
            description: "Provider's children.",
            control: { disable: true },
        },
        i18n: {
            table: {
                type: { summary: 'i18n object' },
            },
            control: { disable: true },
        },
        defaultNS: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Default namespace for i18n.',
            control: { type: 'text' },
        },
    },
} as Meta<IInternalLanguageProviderProps>;

export const Basic: StoryObj<ComponentProps<typeof InternalLanguageProvider>> = {
    render: () => (
        <InternalLanguageProvider i18n={i18n} defaultNS="common">
            <Button theme="outline">Button with translation</Button>
        </InternalLanguageProvider>
    ),
};
