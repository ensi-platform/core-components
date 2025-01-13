import type { ReactNode } from 'react';

export type IPortalProps = {
    /** Content */
    children?: ReactNode;

    /**
     * Function that returns container into which the child elements will be rendered
     */
    getPortalContainer?: () => Element;

    /**
     * Render child elements immediately
     *
     * `false` - content will be rendered to the next render
     */
    immediateMount?: boolean;
};
