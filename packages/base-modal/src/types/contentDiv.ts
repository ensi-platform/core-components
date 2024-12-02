import type { ReactNode } from 'react';

import type { IBaseModalProps } from './component';

export interface IContentDivProps extends Pick<IBaseModalProps, 'contentCSS'> {
    children: ReactNode;
}
