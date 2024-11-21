import DescriptionListItem from './components/DescriptionListItem';
import { useDescriptionListCSS } from './scripts/hooks';
import type { IDescriptionListProps } from './types';

/**
 * List of term-definition pairs with leader dots between them
 */
export const DescriptionList = ({ children, className }: IDescriptionListProps) => {
    const { ulStyles } = useDescriptionListCSS();

    return (
        <ul css={ulStyles} className={className}>
            {children}
        </ul>
    );
};

DescriptionList.Item = DescriptionListItem;
