import InfoListItem from './components/InfoListItem';
import { useInfoListCSS } from './hooks';
import { InfoListTypes } from './types';

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
