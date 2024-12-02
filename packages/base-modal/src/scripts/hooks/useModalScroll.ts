import { useCallback, useRef, useState } from 'react';

import { hasScrollbar, isScrolledToBottom, isScrolledToTop } from '../utils';

export interface IUseModalScroll {
    hasHeader: boolean;
    hasFooter: boolean;
    headerOffset: number;
}

export const useModalScroll = ({ hasHeader, hasFooter, headerOffset }: IUseModalScroll) => {
    const scrollableNodeRef = useRef<HTMLDivElement | null>(null);
    const [hasScroll, setHasScroll] = useState(false);
    const [headerHighlighted, setHeaderHighlighted] = useState(false);
    const [footerHighlighted, setFooterHighlighted] = useState(false);

    const checkToHasScrollbar = () => {
        if (scrollableNodeRef.current) {
            const scrollExists = hasScrollbar(scrollableNodeRef.current);
            setFooterHighlighted(scrollExists);
            setHasScroll(scrollExists);
        }
    };

    const handleScroll = useCallback(() => {
        if (!scrollableNodeRef.current) return;

        if (hasHeader) {
            const isScrolled = scrollableNodeRef.current.getBoundingClientRect().top - headerOffset <= 0;

            setHeaderHighlighted(!isScrolledToTop(scrollableNodeRef.current) && isScrolled);
        }

        if (hasFooter) {
            setFooterHighlighted(
                !isScrolledToBottom(scrollableNodeRef.current) &&
                    scrollableNodeRef.current.getBoundingClientRect().bottom >= window.innerHeight
            );
        }
    }, [hasFooter, hasHeader, headerOffset]);

    return { scrollableNodeRef, hasScroll, headerHighlighted, footerHighlighted, checkToHasScrollbar, handleScroll };
};
