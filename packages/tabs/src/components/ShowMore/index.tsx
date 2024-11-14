import {
    Arrow,
    BaseSelect,
    Optgroup as DefaultOptgroup,
    OptionsList as DefaultOptionsList,
    type FieldProps,
    Option,
} from '@ensi-platform/core-components-select';

import type { FC, FocusEvent, MouseEvent } from 'react';

import { useTabsTheme } from '../../context';
import type { ShowMoreButtonProps } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ButtonField = ({
    count,
    innerProps,
    Arrow,
    className,
    disabled,
    id,
}: Pick<FieldProps, 'innerProps' | 'Arrow' | 'className' | 'disabled' | 'id'> & {
    count?: number;
}) => {
    const { getCSS } = useTabsTheme();

    const { id: innerId, ref, onBlur, onFocus, onClick, ...restInnerProps } = innerProps;

    const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
        if (onBlur) {
            onBlur(event as unknown as FocusEvent<HTMLDivElement | HTMLInputElement>);
        }
    };
    const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
        if (onFocus) {
            onFocus(event as unknown as FocusEvent<HTMLDivElement | HTMLInputElement>);
        }
    };
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event as unknown as MouseEvent<HTMLDivElement | HTMLInputElement>);
        }
    };

    return (
        <div ref={ref} css={{ display: 'flex' }}>
            <button
                type="button"
                css={getCSS('showMoreButton')}
                className={className}
                disabled={disabled}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onClick={handleClick}
                id={innerId || id}
                {...restInnerProps}
            >
                Больше ({count}) {Arrow}
            </button>
        </div>
    );
};

export const ShowMoreButton: FC<ShowMoreButtonProps> = ({
    Optgroup = DefaultOptgroup,
    OptionsList = DefaultOptionsList,
    count,
    onChange,
    options,
    ...props
}) => (
    <BaseSelect
        {...props}
        Arrow={Arrow}
        options={options}
        optionProps={{ Checkmark: null }}
        Option={Option}
        size="sm"
        Optgroup={Optgroup}
        OptionsList={OptionsList}
        Field={ButtonField}
        fieldProps={{ count }}
        selected={[]}
        closeOnSelect
        onChange={onChange}
        popoverPosition="bottom-end"
        css={{
            display: 'flex',
            height: '100%',
        }}
    />
);
