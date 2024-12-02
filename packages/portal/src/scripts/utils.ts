import type { MutableRefObject, RefObject } from 'react';

export const PORTAL_CONTAINER_ATTRIBUTE = 'react-portal-container';

export const createPortalContainer = () => {
    const portalContainer = document.createElement('div');

    portalContainer.setAttribute(PORTAL_CONTAINER_ATTRIBUTE, '');

    document.body.appendChild(portalContainer);

    return portalContainer;
};

export const getDefaultPortalContainer = (): Element =>
    document.querySelector(`[${PORTAL_CONTAINER_ATTRIBUTE}]`) || createPortalContainer();

export const setRef = <T>(ref: RefObject<T> | ((instance: T | null) => void) | null | undefined, value: T | null) => {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        // eslint-disable-next-line no-param-reassign
        (ref as MutableRefObject<T | null>).current = value;
    }
};
