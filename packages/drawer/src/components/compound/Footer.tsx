import type { FC } from 'react';

import { useDrawerContext } from '../../scripts';
import type { IFooterProps } from '../../types';

const Footer: FC<IFooterProps> = props => {
    const { getCSS } = useDrawerContext();

    return <div css={getCSS('footer')} {...props} />;
};

export default Footer;
