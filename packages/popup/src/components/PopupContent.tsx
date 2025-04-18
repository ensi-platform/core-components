import { BaseModalContext } from '@ensi-platform/core-components-base-modal';

import type { CSSObject } from '@emotion/react';

import { type Ref, forwardRef, useContext } from 'react';
import mergeRefs from 'react-merge-refs';

import { usePopupContext } from '../scripts';
import type { IPopupContentProps } from '../types';

const PopupContent = forwardRef<HTMLDivElement, IPopupContentProps>(({ children, className }, ref) => {
    const { contentRef } = useContext(BaseModalContext);

    const { getCSS } = usePopupContext();

    return (
        <div
            className={className}
            css={getCSS('content') as CSSObject}
            ref={mergeRefs([ref, contentRef as Ref<HTMLDivElement>])}
        >
            {children}
        </div>
    );
});

export default PopupContent;
