import type { CSSObject } from '@emotion/react';

import deepmerge from 'deepmerge';
import { useMemo } from 'react';

import { emptyCSS } from '../constants';

export const useMergeCSS = (...CSSToMerge: Array<CSSObject | undefined>) => {
    const mergedCSS = useMemo(() => deepmerge.all<CSSObject>(CSSToMerge.map(CSS => CSS ?? emptyCSS)), [CSSToMerge]);

    return mergedCSS;
};
