import { IconMinus, IconPlus, Layout, useThemeCSSPart } from '@ensi-platform/core-components-common';
import { FormControl } from '@ensi-platform/core-components-form-control';

import { type ChangeEvent, useEffect, useMemo, useState } from 'react';

import { counterThemes } from './themes/defaultTheme';
import type { CounterProps, CounterThemeState } from './types';

export const Counter = ({
    name,
    value,
    label,
    step = 1,
    min = 1,
    max = 999,
    onChange,
    view = 'horizontal',
    hint,
    field,
    meta,
    size = 'md',
    variant = 'primary',
    theme = counterThemes.basic,
    rounded = false,
    ...props
}: CounterProps) => {
    const themeState = useMemo<CounterThemeState>(
        () => ({
            hasLabel: !!label,
            rounded,
            view,
            size,
            variant,
            max,
        }),
        [label, size, variant, view, rounded, max]
    );

    const getCSS = useThemeCSSPart(theme, themeState);

    const [innerValue, setInnerValue] = useState<number | ''>('');

    useEffect(() => {
        if (value) setInnerValue(value);
    }, [value, innerValue]);

    const changeValue = (newValue: number) => {
        setInnerValue(newValue);
        if (onChange) onChange(newValue);
        if (field?.onChange) field.onChange({ target: { value: newValue } });
    };

    const handleInputBlur = ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (field?.onBlur) field?.onBlur();

        const newValue = +target.value;
        if (newValue < min) {
            changeValue(min);
            return;
        }

        if (newValue > max) {
            changeValue(max);
            return;
        }

        changeValue(newValue);
    };

    return (
        <FormControl
            label={label}
            hint={hint}
            error={meta?.error}
            fieldCSS={{
                background: 'none',
                border: 'none',
            }}
        >
            <Layout
                areas={
                    view === 'vertical'
                        ? ['input button-increase', 'input button-decrease']
                        : 'button-decrease input button-increase'
                }
                gap={0}
                inline
                css={getCSS('layout')}
            >
                <Layout.Item area="button-decrease">
                    <button
                        type="button"
                        onClick={() => changeValue(Number(innerValue) - step)}
                        disabled={Number(innerValue) < Number(min + step)}
                        title={`Уменьшить на ${step}`}
                        css={getCSS('decrButton')}
                    >
                        <IconMinus css={getCSS('icon')} />
                    </button>
                </Layout.Item>
                <Layout.Item area="input">
                    <input
                        type="number"
                        inputMode="numeric"
                        name={name}
                        id={name}
                        {...field}
                        {...props}
                        value={innerValue}
                        step={step}
                        onChange={({ target }) =>
                            target.value ? changeValue(Number(target.value)) : setInnerValue('')
                        }
                        onBlur={handleInputBlur}
                        css={getCSS('input')}
                    />
                </Layout.Item>
                <Layout.Item area="button-increase">
                    <button
                        type="button"
                        onClick={() => changeValue(Number(innerValue) + step)}
                        disabled={Number(innerValue) > Number(max - step)}
                        title={`Увеличить на ${step}`}
                        css={getCSS('incrButton')}
                    >
                        <IconPlus css={getCSS('icon')} />
                    </button>
                </Layout.Item>
            </Layout>
        </FormControl>
    );
};
