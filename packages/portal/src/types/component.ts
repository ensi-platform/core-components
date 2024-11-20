import type { ReactNode } from 'react';

export interface IPortalProps {
    /** Content */
    children?: ReactNode;

    /**
     * The container into which the child elements will be rendered
     */
    container?: HTMLElement;

    /**
     * Render the child elements immediately
     *
     * `false` - the content will be rendered to the next render
     * @default false
     */
    immediateMount?: boolean;
}
