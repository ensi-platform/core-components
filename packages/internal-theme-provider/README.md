You need to wrap the part of the application that uses [@ensi-platform/core-components](https://www.npmjs.com/package/@ensi-platform/core-components) in an `InternalThemeProvider` so that the components work correctly.

Based on `ThemeProvider` from [@greensight/gds](https://github.com/greensight/gds)

#### Usage example below:

```jsx
import { Button, InternalThemeProvider } from '@ensi-platform/core-components';

return (
    <OtherProviders>
        <InternalThemeProvider>
            {/* provides custom theme from lib themes */}
            <Button theme="outline">Button with custom theme</Button>
        </InternalThemeProvider>
    <OtherProviders />
);
```
