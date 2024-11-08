import { type ComponentPropsWithRef, type ElementType } from 'react';

export type MergeElementProps<T extends ElementType, P extends object = {}> = Omit<ComponentPropsWithRef<T>, keyof P> &
    P;
