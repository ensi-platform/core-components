Компонент для затемнения экрана при открытии модальных окон

Основан на  [alfalab/core-components](https://github.com/alfa-laboratory/core-components)
```js
import Backdrop from '@components/Backdrop';

const [isOpen, setOpen] = useState(false);

return (
    <Portal>
        <Backdrop open={isOpen} onClose={() => setOpen(false)} />
    </Portal>
);
```