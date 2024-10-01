import DescriptionListItem from './components/DescriptionListItem';
import { useDescriptionListCSS } from './scripts';
import { IDescriptionListProps } from './types';

export * from './types';
export * from './scripts/helpers';
export { DescriptionListItem };

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
