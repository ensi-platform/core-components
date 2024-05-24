import { FC, HTMLProps } from 'react';
import { useDrawerTheme } from '../context';

export type FooterProps = HTMLProps<HTMLDivElement>;

export const Footer: FC<FooterProps> = props => {
    const { getCSS } = useDrawerTheme();

    return <div css={getCSS('footer')} {...props} />;
};
