import { FC, useMemo } from 'react';

import { useSelectTheme } from '../../context';
import { OptionProps } from './types';

export const Option: FC<OptionProps> = ({
    className,
    option,
    children,
    selected = false,
    highlighted = false,
    disabled = false,
    innerProps,
}) => {
    const content = children || option.content || option.label;

    const { getCSS } = useSelectTheme();

    const optionCSS = useMemo(
        () =>
            getCSS('option', {
                isDisabled: disabled,
                isHover: highlighted,
                isSelected: selected,
                isPreloader: option.isPreloader || false,
            }),
        [disabled, getCSS, highlighted, selected, option.isPreloader]
    );

    return (
        <li className={className} css={optionCSS} {...innerProps}>
            {content}
        </li>
    );
};
