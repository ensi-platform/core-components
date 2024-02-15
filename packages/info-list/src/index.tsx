import InfoListItem from './components/InfoListItem';
import { useInfoListCSS } from './scripts';
import { InfoListTypes } from './types';

export * from './types';
export * from './scripts/helper';

const InfoList = ({ children, className }: InfoListTypes) => {
    const { ulStyles } = useInfoListCSS();

    return (
        <ul css={ulStyles} className={className}>
            {children}
        </ul>
    );
};

InfoList.Item = InfoListItem;

export default InfoList;
