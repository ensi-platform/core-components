import type { FC } from 'react';

import { useDrawerContext } from '../scripts';
import type { IDrawerContentProps } from '../types';

const DrawerContent: FC<IDrawerContentProps> = props => {
    const { getCSS } = useDrawerContext();

    return <div css={getCSS('content')} {...props} />;
};

export default DrawerContent;
