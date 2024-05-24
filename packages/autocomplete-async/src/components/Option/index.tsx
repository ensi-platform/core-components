import { CSSObject } from '@emotion/react';
import { FC, useMemo } from 'react';

// eslint-disable-next-line import/named

import { useSelectTheme, OptionProps } from '@greensight/core-components-select';

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
            }) as CSSObject,
        [disabled, getCSS, highlighted, selected, option.isPreloader]
    );

    return (
        <li {...innerProps} className={className} css={optionCSS}>
            {content}
        </li>
    );
};
