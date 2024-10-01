import { useGetInfoItemValue, useDescriptionListCSS } from '../scripts';
import { DescriptionListItemType } from '../types';

/**
 *  Description list item
 */
const DescriptionListItem = ({ name, valueNoWrap, ...props }: DescriptionListItemType) => {
    const { nameStyles, valueStyles, dashedItemStyles } = useDescriptionListCSS();

    const value = useGetInfoItemValue(props);

    return (
        <li>
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
