import { scale, defaultTheme } from '@ensi-platform/core-components-common';
import { CSSObject } from '@emotion/react';
import { SkipProps } from './types';

export * from './types';

const { colors, typography } = defaultTheme;

const skipStyles: CSSObject = {
    position: 'absolute',
    top: '-100%',
    left: 0,
    padding: scale(1),
    borderBottomRightRadius: scale(1),
    ...typography('h2'),
    background: colors.primary,
    color: colors.white,
    zIndex: 1000,
    ':focus': { top: 0, outline: 'none' },
    ':hover': { backgroundColor: colors.primaryHover },
};

export const Skip = ({ link, children, ...props }: SkipProps) => (
    <a href={link} css={skipStyles} {...props}>
        {children}
    </a>
);
