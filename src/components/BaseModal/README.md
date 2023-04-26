Базовый компонент для модальных окон

```js
import BaseModal from '@components/BaseModal';

const [isOpen, setOpen] = useState(false);
const handleModalOpen = () => setOpen(!open);
return (
    <BaseModal open={isOpen} onClose={handleModalOpen}>
        <div style={{ padding: '100px' }}>BaseModal content!</div>
    </BaseModal>
);
```