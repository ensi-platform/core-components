import { forwardRef } from 'react';

import { componentDivCSS } from '../scripts';
import type { IComponentDivProps } from '../types';

const ComponentDiv = forwardRef<HTMLDivElement, IComponentDivProps>(({ children, className }, ref) => (
    <div data-role="component" ref={ref} css={componentDivCSS} className={className}>
        {children}
    </div>
));

export default ComponentDiv;
