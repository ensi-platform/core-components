import { DescriptionListItemType } from '@greensight/core-components-description-list';
import { useGetInfoItemValue, useDescriptionListCSS } from '../scripts/hooks';

/**
 *  Description list item
 */
const DescriptionListItem = ({ name, valueNoWrap, className, ...props }: DescriptionListItemType) => {
    const { nameStyles, valueStyles, dashedItemStyles } = useDescriptionListCSS();

    const value = useGetInfoItemValue(props);

    return (
        <li className={className}>
            {name && (
                <>
                    <span css={nameStyles}>{name}</span>

                    <span css={dashedItemStyles} />
                </>
            )}

            <span
                css={{
                    ...valueStyles,
                    ...(valueNoWrap && { whiteSpace: 'nowrap', wordBreak: 'normal' }),
                }}
            >
                {value}
            </span>
        </li>
    );
};

export default DescriptionListItem;
