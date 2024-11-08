import { HTMLProps, ReactNode, useMemo } from 'react';
import { AccordionItemButton as ReactAccordionItemButton } from 'react-accessible-accordion';

import { useAccordion } from '../scripts/useAccordion';

export interface AccordionButtonProps extends HTMLProps<HTMLDivElement> {
    /** Heading content */
    children: ReactNode;
}

export const AccordionButton = ({ children, ...props }: AccordionButtonProps) => {
    const { getCSS, Icon } = useAccordion();

    const buttonCSS = useMemo(() => getCSS('button'), [getCSS]);
    const iconCSS = useMemo(() => getCSS('buttonIcon'), [getCSS]);

    return (
        <ReactAccordionItemButton css={buttonCSS} {...props}>
            {children}
            {Icon && <Icon aria-hidden css={iconCSS} />}
        </ReactAccordionItemButton>
    );
};
