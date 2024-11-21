import { type HTMLProps, type ReactNode, useMemo } from 'react';
import { AccordionItem as ReactAccordionItem } from 'react-accessible-accordion';

import { useAccordion } from '../scripts/useAccordion';

export interface AccordionItemProps extends Omit<HTMLProps<HTMLDivElement>, 'ref'> {
    /** Accordion.Heading and Accordion.Panel */
    children: ReactNode;
    /** Unique panel id */
    uuid?: string;
}

export const AccordionItem = ({ children, uuid, ...props }: AccordionItemProps) => {
    const { getCSS } = useAccordion();

    const styles = useMemo(() => getCSS('item'), [getCSS]);

    return (
        <ReactAccordionItem uuid={uuid} css={styles} {...props}>
            {children}
        </ReactAccordionItem>
    );
};
