A component for managing stacking order.

If the component's styles use the `z-index` property, it is likely that the component should utilize the `Stack` component

Based on [alfalab/core-components](https://github.com/alfa-laboratory/core-components)

#### Usage example below:

```jsx
import { Stack } from '@ensi-platform/core-components';

return (
    <Stack>
        {zIndex1 => (  // zIndex1 === 10
            /* ... */
            <Stack>
                {zIndex2 => (  // zIndex2 === 11
                    /* ... */
                )}
            </Stack>
        )}
    </Stack>
);
```

#### Predefined z-index values
The `StackingOrderEnum` provides a set of predefined constants for commonly used z-index values based on component types. Below are the available constants:

- **FOCUSED (2)**: For focusable components such as buttons and input fields.
- **DEFAULT (10)**: Default value.
- **MODAL (50)**: For modal windows with overlays.
- **POPOVER (100)**: For components that manage their position, such as popovers and tooltips.
- **TOAST (1000)**: For toasts and notifications.
