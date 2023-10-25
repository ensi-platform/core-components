Компонент для затемнения экрана при открытии модальных окон

```js
import Backdrop from '@components/Backdrop';

const [isOpen, setOpen] = useState(false);

return (
    <Portal>
        <Backdrop open={isOpen} onClose={() => setOpen(false)} />
    </Portal>
);
```