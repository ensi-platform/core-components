The basic component for modal windows

Based on [alfalab/core-components](https://github.com/alfa-laboratory/core-components)

#### Usage example below:

```jsx
import BaseModal from '@ensi-platform/core-components';

const [isOpen, setOpen] = useState(false);
const handleModalOpen = () => setOpen(!open);

return (
    <BaseModal open={isOpen} onClose={handleModalOpen}>
        <div style={{ padding: '100px' }}>BaseModal content!</div>
    </BaseModal>
);
```
