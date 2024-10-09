
import { CSSObject } from '@emotion/react';

export const DEFAULT_OFFSET: [number, number] = [0, 16];

export const EMPTY_OBJ: CSSObject = {};

export const POSITION_OPTIONS = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
] as const;
