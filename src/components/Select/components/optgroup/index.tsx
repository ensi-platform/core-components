import { scale, typography } from '@scripts/gds';

import { OptgroupProps } from '../../types';

export const Optgroup = ({ children, className, label }: OptgroupProps) => (
    <>
        <div
            className={className}
            css={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: `${scale(1)}px ${scale(1, true)}px`,
                "& + *[role='option']:before": {
                    display: 'none',
                },
                cursor: 'default'
            }}
        >
            <p
                css={{
                    ...typography('bodySmBold'),
                }}
            >
                {label}
            </p>
        </div>
        {children}
    </>
);
