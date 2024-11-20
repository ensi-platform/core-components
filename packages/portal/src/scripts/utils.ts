import type { MutableRefObject, RefObject } from 'react';

export const PORTAL_CONTAINER_ATTRIBUTE = 'react-portal-container';

const createPortalContainer = (): HTMLDivElement => {
    const portalContainer = document.createElement('div');

    portalContainer.setAttribute(PORTAL_CONTAINER_ATTRIBUTE, '');

    document.body.appendChild(portalContainer);

    return portalContainer;
};

export const getDefaultPortalContainer = (): HTMLElement =>
    document.querySelector(`[${PORTAL_CONTAINER_ATTRIBUTE}]`) || createPortalContainer();

export const setRef = <T>(
    ref: RefObject<T> | ((instance: T | null) => void) | null | undefined,
    value: T | null
): void => {
    if (!ref) return;

    if (typeof ref === 'function') {
        ref(value);
    }

    (ref as MutableRefObject<T | null>).current = value;
};
