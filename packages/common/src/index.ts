import validateInn from './scripts/validateInn';

import { defineTheme } from './scripts/gds';
import defaultTokens from './defaultTokens.json';

export { defaultTokens };

const defaultTheme = defineTheme(defaultTokens, {
    base: {
        focus: {
            width: 2,
            color: defaultTokens.colors.warning,
            offset: 2,
        },
        body: {
            typography: 'bodySm',
        },
        css: {
            // При необходимости ввести кастомные шрифты в админке, необходимо удалить этот стиль
            '*': {
                fontFamily:
                    '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif !important',
            },
            'input[type="number"]': {
                appearance: 'auto',
            },
            'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button': {
                margin: 0,
                appearance: 'none',
            },
            hr: { borderColor: defaultTokens.colors.grey400, borderWidth: '1px 0 0 0', borderStyle: 'solid' },
            '.tox-notifications-container': { display: `none !important` },
            'input[type="time"]::-webkit-calendar-picker-indicator': {
                filter: 'invert(0.5) hue-rotate(175deg)',
            },
        },
    },
});


export { defaultTheme, validateInn };

export * from './scripts/constants';
export * from './scripts/enums';
export * from './scripts/gds';
export * from './scripts/helpers';
export * from './scripts/hooks';
export * from './scripts/mask';
export * from './scripts/regex';

export * from './icons-export';
