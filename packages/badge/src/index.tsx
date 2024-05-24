import { CSSObject } from '@emotion/react';
import { STATUSES, defaultTheme, scale } from '@greensight/core-components-common';

const { colors, typography } = defaultTheme;

export interface BadgeProps {
    text: string;
    type?: STATUSES;
}

export type StatusColors = Record<STATUSES, CSSObject>;

const defaultStatusColors: StatusColors = {
    created: {
        color: colors.white,
        backgroundColor: colors.primary,
    },
    success: {
        color: colors.white,
        backgroundColor: colors.success,
    },
    error: {
        color: colors.white,
        backgroundColor: colors.danger,
    },
    warning: {
        color: colors.white,
        backgroundColor: colors.warning,
    },
    regular: {
        color: colors.white,
        backgroundColor: colors.secondaryHover,
    },
};

export const Badge = ({ text, type = STATUSES.REGULAR }: BadgeProps) => (
    <div
        css={{
            display: 'inline-flex',
            alignItems: 'center',
            ...defaultStatusColors[type],
            borderRadius: 2,
            padding: `1px ${scale(1, true)}px`,
            whiteSpace: 'pre-line',
            ...typography('smallBold'),
        }}
    >
        {text}
    </div>
);
