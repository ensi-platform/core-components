import type { FC } from 'react';

import { useDrawerContext } from '../../scripts';
import type { IContentProps } from '../../types';

const Content: FC<IContentProps> = props => {
    const { getCSS } = useDrawerContext();

    return <div css={getCSS('content')} {...props} />;
};

export default Content;
