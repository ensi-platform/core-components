A component for darkening the screen when opening modal windows

Based on [alfalab/core-components](https://github.com/alfa-laboratory/core-components)

#### Usage example below:

```jsx
import Backdrop from '@ensi-platform/core-components';

const [isOpen, setOpen] = useState(false);

return (
    <Portal>
        <Backdrop isOpen={isOpen} onClose={() => setOpen(false)} />
    </Portal>
);
```
