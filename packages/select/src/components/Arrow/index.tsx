import { useMemo } from 'react';

// import ArrowIcon from '@icons/small/chevronUp.svg';
import { useSelectTheme } from '../../context';
import { ArrowProps } from './types';

export const Arrow = ({ disabled, className }: ArrowProps) => {
    const {
        getCSS,
        state: { isOpen },
    } = useSelectTheme();
    const totalArrowButtonCSS = useMemo(() => getCSS('arrowButton'), [getCSS]);

    return (
        <span css={totalArrowButtonCSS}>
            {/* <ArrowIcon
                className={className}
                css={{
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    transition: 'transform ease 300ms',
                    ...(!isOpen && { transform: 'rotate(180deg)' }),
                    ':hover': {
                        opacity: 0.5,
                    },
                }}
            /> */}
        </span>
    );
};
