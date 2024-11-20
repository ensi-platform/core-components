import { forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { getDefaultPortalContainer, setRef } from './scripts/utils';
import type { IPortalProps } from './types';

const Portal = forwardRef<Element, IPortalProps>(
    ({ container = getDefaultPortalContainer(), immediateMount = false, children }, ref) => {
        const [mountNode, setMountNode] = useState<Element | null>(() => (immediateMount ? container : null));

        useEffect(() => {
            setMountNode(container);
        }, [container]);

        useEffect(() => {
            if (mountNode) {
                setRef(ref, mountNode);
                return () => {
                    setRef(ref, null);
                };
            }

            return () => null;
        }, [ref, mountNode]);

        return mountNode ? createPortal(children, mountNode) : null;
    }
);

export default Portal;
