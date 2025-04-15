You need to wrap the part of the application that uses [@ensi-platform/core-components](https://www.npmjs.com/package/@ensi-platform/core-components) in an `CoreComponentsProvider` so that the components work correctly.

`CoreComponentsProvider` is based on `ThemeProvider` from [@greensight/gds](https://github.com/greensight/gds) and `I18nextProvider` from [react-i18next](https://github.com/i18next/react-i18next). It ensures proper theming and internationalization support for the components.

### Usage

#### Basic Usage
```jsx
import { Button, CoreComponentsProvider } from '@ensi-platform/core-components';

return (
    <OtherProviders>
        <CoreComponentsProvider>
            {/* Provides custom theme from lib themes */}
            <Button theme="outline">Button with custom theme</Button>
        </CoreComponentsProvider>
    </OtherProviders>
);
```

#### Usage with `i18n`
If your project uses `i18n`, pass an existing i18n instance to `CoreComponentsProvider` to enable translation support:

```jsx
import { Button, CoreComponentsProvider } from '@ensi-platform/core-components';
import i18n from './i18n';

return (
    <OtherProviders>
        <CoreComponentsProvider i18nInstance={i18n}>
            {/* Provides custom theme and translation support */}
            <Button theme="outline">Button with custom theme and translation</Button>
        </CoreComponentsProvider>
    </OtherProviders>
);
```

### Props
| Prop            | Type     | Description |
|---------------|---------|-------------|
| `i18nInstance` | `object` | Optional. Pass a custom `i18n` instance if your project uses internationalization. |

### Notes
- When using `CoreComponentsProvider` without `i18nInstance`, a default i18n instance will be used.
- Ensure that the translations are properly loaded in your project to avoid missing translations.

