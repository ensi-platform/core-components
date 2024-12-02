import { forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { getDefaultPortalContainer, setRef } from './scripts';
import type { IPortalProps } from './types';

const Portal = forwardRef<Element, IPortalProps>(
    ({ getPortalContainer = getDefaultPortalContainer, immediateMount = false, children }, ref) => {
        const [mountNode, setMountNode] = useState<Element | null>(() =>
            immediateMount ? getPortalContainer() : null
        );

        useEffect(() => {
            setMountNode(getPortalContainer());
        }, [getPortalContainer]);

        useEffect(() => {
            if (mountNode) {
                setRef(ref, mountNode);
                return () => {
                    setRef(ref, null);
                };
            }
            return () => null;
        }, [ref, mountNode]);

        return mountNode ? <>{createPortal(children as any, mountNode)}</> : mountNode;
    }
);

export default Portal;
