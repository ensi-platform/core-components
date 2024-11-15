import { defaultTokens, scale } from '@ensi-platform/core-components-common';

import { jsx } from '@emotion/react';

import type { ElementType } from 'react';

import BlockBody from './components/BlockBody';
import BlockMobileFluid from './components/BlockBodyFluid';
import BlockFooter from './components/BlockFooter';
import BlockHeader from './components/BlockHeader';
import type { IBlockProps } from './types';

export { BlockHeader };
export { BlockMobileFluid };
export { BlockBody };
export { BlockFooter };

export const Block = <T extends ElementType = 'section'>({
    as,
    background = defaultTokens.colors.white,
    boxShadow = defaultTokens.shadows.big,
    ...props
}: IBlockProps<T>) =>
    jsx(as || 'section', {
        css: { boxShadow, width: '100%', backgroundColor: background, borderRadius: scale(1) },
        ...props,
    });

Block.Header = BlockHeader;
Block.Body = BlockBody;
Block.MobileFluid = BlockMobileFluid;
Block.Footer = BlockFooter;
