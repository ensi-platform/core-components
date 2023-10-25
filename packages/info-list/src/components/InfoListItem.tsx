import { useGetInfoItemValue, useInfoListCSS } from '../hooks';
import { InfoListItemCommonType } from '../types';

const InfoListItem = (props: InfoListItemCommonType) => {
    const { nameStyles, valueStyles, dashedItemStyles } = useInfoListCSS();

    const { name, valueNoWrap, ...item } = props;
    const value = useGetInfoItemValue(item);

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

export default InfoListItem;
