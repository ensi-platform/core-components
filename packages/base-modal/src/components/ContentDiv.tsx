import { forwardRef } from 'react';

import { contentDivCSS } from '../scripts';
import type { IContentDivProps } from '../types';

const ContentDiv = forwardRef<HTMLDivElement, IContentDivProps>(({ children, contentCSS }, ref) => (
    <div data-role="content" ref={ref} css={{ ...contentCSS, ...contentDivCSS }}>
        {children}
    </div>
));

export default ContentDiv;
