import { jsx } from '@emotion/react';
import { ElementType, ReactNode } from 'react';

import { scale, defaultTokens } from '@greensight/core-components-common';

import BlockBody from './components/BlockBody';
import BlockMobileFluid from './components/BlockBodyFluid';
import BlockFooter from './components/BlockFooter';
import BlockHeader from './components/BlockHeader';

type BlockProps<P extends ElementType = 'section'> = {
    /** Use your own React component for render. */
    as?: P;
    children: ReactNode | ReactNode[];
    className?: string;
    background?: string;
    boxShadow?: string;
};

const Block = <T extends ElementType = 'section'>({
    as,
    background = defaultTokens.colors.white,
    boxShadow = defaultTokens.shadows.big,
    ...props
}: BlockProps<T>) =>
    jsx(as || 'section', {
        css: { boxShadow, width: '100%', backgroundColor: background, borderRadius: scale(1) },
        ...props,
    });

Block.Header = BlockHeader;
Block.Body = BlockBody;
Block.MobileFluid = BlockMobileFluid;
Block.Footer = BlockFooter;

export default Block;
