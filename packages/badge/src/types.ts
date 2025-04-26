import type { HTMLProps } from 'react';

export enum BadgeTypeEnum {
    CREATED = 'created',
    REGULAR = 'regular',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export interface IBadgeProps extends HTMLProps<HTMLDivElement> {
    /** background */
    bgColor?: string;
    /** badge type */
    type?: BadgeTypeEnum;
}
