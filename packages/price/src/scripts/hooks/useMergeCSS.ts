import { type CSSObject } from '@emotion/react';
import { useMemo } from 'react';
import deepmarge from 'deepmerge';
import { emptyCSS } from '../helpers';

export const useMergeCSS = (...CSSToMerge: CSSObject[]) => {
    const mergedCSS = useMemo(() => deepmarge.all<CSSObject>(CSSToMerge.map(CSS => CSS ?? emptyCSS)), [CSSToMerge]);

    return mergedCSS;
};
