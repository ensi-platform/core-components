import { STATUSES, defaultTheme, scale } from '@greensight/core-components-common';

const { colors, typography } = defaultTheme;

export interface BadgeProps {
    text: string;
    bgColor?: string;
    type?: STATUSES;
}

const STATUS_COLORS: Record<STATUSES, string> = {
    [STATUSES.CREATED]: colors?.primary,
    [STATUSES.SUCCESS]: colors?.success,
    [STATUSES.ERROR]: colors?.danger,
    [STATUSES.WARNING]: colors?.warning,
    [STATUSES.REGULAR]: colors?.secondaryHover,
};

export const Badge = ({ text, bgColor = colors.secondaryHover, type = STATUSES.REGULAR }: BadgeProps) => {
    const backgroundColor = STATUS_COLORS[type] || bgColor;

    return (
        <div
            css={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor,
                borderRadius: 2,
                padding: `1px ${scale(1, true)}px`,
                whiteSpace: 'pre-line',
                ...typography('smallBold'),
            }}
        >
            {text}
        </div>
    );
};
