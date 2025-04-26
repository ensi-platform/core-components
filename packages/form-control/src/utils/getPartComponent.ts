import { isValidElement } from 'react';

import type { TPartComponent, TPartObjComponent } from '../types';

const DEFAULT_OBJ = {};
const DEFAULT_OBJS = {
    css: DEFAULT_OBJ,
    className: '',
};

export const getPartComponent = <E extends Record<string, any>, T extends TPartComponent<E>>(
    props?: T
): Required<TPartObjComponent> & Partial<E> => {
    if (!props) return { Component: '', ...DEFAULT_OBJS } as Required<TPartObjComponent> & E;
    if (typeof props === 'string') return { Component: props, ...DEFAULT_OBJS } as Required<TPartObjComponent> & E;
    if (isValidElement(props)) return { Component: props, ...DEFAULT_OBJS } as Required<TPartObjComponent> & E;
    return { ...DEFAULT_OBJS, ...(props as Required<TPartObjComponent> & E) };
};
