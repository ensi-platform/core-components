import { IDescriptionListProps, DescriptionListItem } from '@greensight/core-components-description-list';
import { useDescriptionListCSS } from './scripts/hooks';

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
