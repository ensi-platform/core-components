Базовый компонент для модальных окон

Основан на  [alfalab/core-components](https://github.com/alfa-laboratory/core-components)
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