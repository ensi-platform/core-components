import type { FC } from 'react';

import { useDrawerContext } from '../scripts';
import type { IDrawerFooterProps } from '../types';

const DrawerFooter: FC<IDrawerFooterProps> = props => {
    const { getCSS } = useDrawerContext();

    return <div css={getCSS('footer')} {...props} />;
};

export default DrawerFooter;
