The Portal component allows you to render child elements to a DOM node that is outside the DOM hierarchy of the parent component.

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
