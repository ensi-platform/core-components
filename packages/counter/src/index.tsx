import { IconMinus, IconPlus, Layout, useThemeCSSPart } from '@ensi-platform/core-components-common';
import { FormControl } from '@ensi-platform/core-components-form-control';

import { type ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { counterThemes } from './themes/defaultTheme';
import type { CounterProps, CounterThemeState } from './types';

export const Counter = ({
    value,
    label,
    step = 1,
    min = 1,
    max = 999,
    onChange,
    view = 'horizontal',
    hint,
    field,
    setFieldValue,
    error,
    size = 'md',
    variant = 'primary',
    theme = counterThemes.basic,
    rounded = false,
    ...props
}: CounterProps) => {
    const { t } = useTranslation('translation');

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

    const formValue = field?.value || value;

    useEffect(() => {
        if (formValue) setInnerValue(formValue);
    }, [formValue, innerValue]);

    const changeValue = (newValue: number) => {
        setInnerValue(newValue);
        if (onChange) onChange(newValue);
        setFieldValue?.(newValue);
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
            error={error}
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
                        title={`${t('translation:decrease')} ${step}`}
                        css={getCSS('decrButton')}
                    >
                        <IconMinus css={getCSS('icon')} />
                    </button>
                </Layout.Item>
                <Layout.Item area="input">
                    <input
                        type="number"
                        inputMode="numeric"
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
                        title={`${t('translation:increase')} ${step}`}
                        css={getCSS('incrButton')}
                    >
                        <IconPlus css={getCSS('icon')} />
                    </button>
                </Layout.Item>
            </Layout>
        </FormControl>
    );
};
