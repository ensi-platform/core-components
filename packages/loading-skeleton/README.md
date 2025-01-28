This is a preloader in the form of a skeleton that indicates that the download is in progress.
So far, it has only a `basic` theme.

Without using the `height` prop, the skeleton will adjust to the current `font-size`

This component is based on [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton#readme)

#### Usage example with Layout:

```jsx
import { LoadingSkeleton } from '@ensi-platform/core-components';

return (
    <Layout>
        /* returns 2 `LoadingSkeleton's` wrapped in `Layout.Item`*/
        <LoadingSkeleton count={2} asLayoutItem layoutItemProps={...}/>
    </Layout>
);
```
