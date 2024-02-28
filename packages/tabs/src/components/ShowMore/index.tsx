import { FC } from 'react';

import {
    Arrow,
    BaseSelect,
    OptionsList as DefaultOptionsList,
    FieldProps,
    Option,
} from '@greensight/core-components-select';

import { useTabsTheme } from '../../context';
import { ShowMoreButtonProps } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ButtonField = ({ count, innerProps, Arrow, className, disabled, id }: FieldProps & { count?: number }) => {
    const { getCSS } = useTabsTheme();

    const { ref, ...restInnerProps } = innerProps;

    return (
        <div ref={ref} css={{ display: 'flex' }}>
            <button
                type="button"
                css={getCSS('showMoreButton')}
                className={className}
                disabled={disabled}
                id={id}
                {...(restInnerProps as any)}
            >
                Больше ({count}) {Arrow}
            </button>
        </div>
    );
};

export const ShowMoreButton: FC<ShowMoreButtonProps> = ({
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
        Option={Option}
        size="sm"
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
