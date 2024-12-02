import type { ReactNode } from 'react';

import type { IBaseModalProps } from './component';

export interface IComponentDivProps extends Pick<IBaseModalProps, 'className'> {
    children: ReactNode;
}
