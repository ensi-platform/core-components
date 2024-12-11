import type { HTMLProps } from 'react';

import type { IBaseModalProps } from './component';

export interface IContentDivProps extends HTMLProps<HTMLDivElement>, Pick<IBaseModalProps, 'contentCSS'> {}
