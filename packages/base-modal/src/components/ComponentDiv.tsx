import type { CSSObject } from '@emotion/react';

import { forwardRef } from 'react';

import type { IComponentDivProps } from '../types';

const componentDivCSS: CSSObject = {
    position: 'relative',
    margin: 'auto',
    flexShrink: 0,
};

const ComponentDiv = forwardRef<HTMLDivElement, IComponentDivProps>(({ children, className }, ref) => (
    <div data-role="component" ref={ref} css={componentDivCSS} className={className}>
        {children}
    </div>
));

export default ComponentDiv;
