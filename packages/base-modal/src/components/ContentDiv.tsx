import type { CSSObject } from '@emotion/react';

import { forwardRef } from 'react';

import type { IContentDivProps } from '../types';

const contentDivCSS: CSSObject = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
};

const ContentDiv = forwardRef<HTMLDivElement, IContentDivProps>(({ children, contentCSS }, ref) => (
    <div data-role="content" ref={ref} css={{ ...contentCSS, ...contentDivCSS }}>
        {children}
    </div>
));

export default ContentDiv;
