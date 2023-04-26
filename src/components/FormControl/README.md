Базовый компонент для построения полей ввода - input, textarea, select и др.
Принимает `ref`, который применяется к inner div-обертке.

```js
import FormControl from '@components/FormControl';
```


```tsx
<FormControl
    theme={formControlThemes.basic}
    rightAddons={<p>R</p>}
    leftAddons={<p>L</p>}
    bottomAddons={<p>Bottom addons</p>}
    onClick={action('click on field')}
    fieldCSS={{
        ':hover': {
            opacity: 0.5,
        },
    }}
>
    <div
        className="control"
        style={{ height: '100%', color: 'green', display: 'flex', alignItems: 'center', padding: '0 8px' }}
    >
        I'm a UI element
    </div>
</FormControl>
```