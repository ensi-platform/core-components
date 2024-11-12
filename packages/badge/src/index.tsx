import { STATUSES, defaultTheme, scale } from '@ensi-platform/core-components-common';

const { colors, typography } = defaultTheme;

export interface BadgeProps {
    text: string;
    bgColor?: string;
    type?: STATUSES;
}

export const Badge = ({ text, bgColor = colors.secondaryHover, type = STATUSES.REGULAR }: BadgeProps) => {
    let backgroundColor;
    switch (type) {
        case STATUSES.CREATED: {
            backgroundColor = colors?.primary;
            break;
        }
        case STATUSES.SUCCESS: {
            backgroundColor = colors?.success;
            break;
        }
        case STATUSES.ERROR: {
            backgroundColor = colors?.danger;
            break;
        }
        case STATUSES.WARNING: {
            backgroundColor = colors?.warning;
            break;
        }
        default: {
            backgroundColor = bgColor;
        }
    }

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
        >
            {text}
        </div>
    );
};
