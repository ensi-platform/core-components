import { FC, HTMLProps } from 'react';

import { scale } from '@scripts/gds';

export type ContentProps = HTMLProps<HTMLDivElement>;

export const Content: FC<ContentProps> = props => (
    <div css={{ padding: scale(3), flexGrow: 1, flexShrink: 0 }} {...props} />
);

export default Content;
