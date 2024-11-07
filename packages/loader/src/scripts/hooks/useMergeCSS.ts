import { type CSSObject } from '@emotion/react';

import deepmerge from 'deepmerge';
import { useMemo } from 'react';

import { emptyCSS } from '../helpers';

export const useMergeCSS = (...CSSToMerge: CSSObject[]) => {
    const mergedCSS = useMemo(() => deepmerge.all<CSSObject>(CSSToMerge.map(CSS => CSS ?? emptyCSS)), [CSSToMerge]);

    return mergedCSS;
};
