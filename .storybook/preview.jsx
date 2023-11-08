import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ThemeProvider, defaultTheme } from '../packages/common/src';
import { Global } from '@emotion/react';

export const parameters = {
    viewMode: 'docs',
    docs: {
        disable: false,
        viewMode: 'docs',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
        hideNoControlsWarning: true,
        expanded: true,
    },
    viewport: {
        viewports: {
            ...INITIAL_VIEWPORTS,
            'Laptop 1440px': {
                name: 'Laptop 1440px',
                styles: {
                    width: '1440px',
                    height: '1000px',
                },
                type: 'desktop',
            },
            'Desktop 1600px': {
                name: 'Desktop 1600px',
                styles: {
                    width: '1600px',
                    height: '1000px',
                },
                type: 'desktop',
            },
            'Desktop 1920px': {
                name: 'Desktop 1920px',
                styles: {
                    width: '1920px',
                    height: '1080px',
                },
                type: 'desktop',
            },
        },
    },
    paddings: {
        values: [
            { name: 'None', value: '0' },
            { name: 'Small', value: '16px' },
            { name: 'Medium', value: '32px' },
            { name: 'Large', value: '64px' },
        ],
        default: 'Medium',
    },
    backgrounds: {
        grid: { cellSize: 8 },
    },
    options: {
        storySort: {
            order: ['Intro', 'Autokits', 'Components'],
        },
    },
};

export const decorators = [
    Story => {
        return (
            <ThemeProvider theme={defaultTheme.theme}>
                <Global
                    styles={[
                        {
                            'ul li, ol li': {
                                listStyle: 'outside!important',
                            },
                            'ol li': {
                                listStyleType: 'decimal'
                            }
                        },
                    ]}
                />
                <Story />
            </ThemeProvider>
        );
    },
];
