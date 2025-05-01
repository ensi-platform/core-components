import { defaultTheme, scale } from '@ensi-platform/core-components-common';

import { type FC } from 'react';

import { BadgeTypeEnum, type IBadgeProps } from './types';

const { colors, typography } = defaultTheme;

const BACKGROUND: Record<string, string> = {
    [BadgeTypeEnum.CREATED]: colors?.primary,
    [BadgeTypeEnum.SUCCESS]: colors?.success,
    [BadgeTypeEnum.ERROR]: colors?.danger,
    [BadgeTypeEnum.WARNING]: colors?.warning,
};

export const Badge: FC<IBadgeProps> = ({
    children,
    bgColor = colors.secondaryHover,
    type = BadgeTypeEnum.REGULAR,
    ...props
}) => {
    const backgroundColor: string = BACKGROUND[type] || bgColor;

    return (
        <div
            css={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor,
                color: colors?.white,
                borderRadius: 2,
                padding: `1px ${scale(1, true)}px`,
                whiteSpace: 'pre-line',
                ...typography('smallBold'),
            }}
            {...props}
        >
            {children}
        </div>
    );
};
