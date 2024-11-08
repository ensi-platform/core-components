import { FC, HTMLProps } from 'react';

import { useDrawerTheme } from '../context';

export type ContentProps = HTMLProps<HTMLDivElement>;

export const Content: FC<ContentProps> = props => {
    const { getCSS } = useDrawerTheme();

    return <div css={getCSS('content')} {...props} />;
};

export default Content;
