import { IconSmallClosed as CloseIcon, defaultTheme, scale } from '@ensi-platform/core-components-common';
import type { IFieldWrapperProps } from '@ensi-platform/core-components-form';
import { FormControl, formControlThemes } from '@ensi-platform/core-components-form-control';

import type { CSSObject } from '@emotion/react';

import deepmerge from 'deepmerge';
import {
    type AnimationEvent,
    type ChangeEvent,
    type FocusEvent,
    type MouseEvent,
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';

import type { InputProps } from './types';

export * from './types';

const { colors } = defaultTheme;

export const BASE_INPUT_CSS: CSSObject = {
    '@keyframes autofill': {
        '0%': {
            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        },
        '100%': {
            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0.01)',
        },
    },
    width: '100%',
    WebkitAppearance: 'none',
    position: 'relative',
    ':disabled': {
        cursor: 'not-allowed',
    },
    '::placeholder': {
        color: colors.grey400,
    },
    background: 'transparent',
    outline: 'none!important',
    border: 'none!important',
    textOverflow: 'ellipsis',
    '&:-webkit-autofill': {
        WebkitTransition: 'background-color 999999s ease-in-out 0s',
        transition: 'background-color 999999s ease-in-out 0s',
        '&:hover,:&active,&:focus': {
            WebkitTransition: 'background-color 999999s ease-in-out 0s',
            transition: 'background-color 999999s ease-in-out 0s',
        },
        animation: 'autofill 999999s forwards',
    },
    '&:not(:-webkit-autofill)': {
        animation: 'autofill 999999s',
    },
};

const emptyStyle = {};

export const Input = forwardRef<HTMLInputElement, InputProps & Partial<IFieldWrapperProps<string>>>(
    (
        {
            type = 'text',
            block = true,
            size = 'md',
            variant = 'primary',
            theme: themeProp = formControlThemes.basic,
            bottomAddons,
            clear = false,
            disabled,
            labelWrap,
            error,
            hint,
            className,
            inputCSS = emptyStyle,
            labelCSS = emptyStyle,
            leftAddonsCSS = emptyStyle,
            rightAddonsCSS = emptyStyle,
            label,
            leftAddons,
            innerLeftAddons,
            onFocus,
            onBlur,
            onChange,
            onClear,
            onClick,
            onMouseDown,
            onMouseUp,
            onAnimationStart,
            rightAddons,
            value,
            defaultValue,
            wrapperRef,
            readOnly: readOnlyProp,
            disableUserInput,
            placeholder,
            showError = true,
            fieldCSS = emptyStyle,
            wrapperCSS = emptyStyle,
            field,
            ...restProps
        },
        ref
    ) => {
        delete restProps.isLegend;

        const readOnly = readOnlyProp || disableUserInput;
        const theme = typeof themeProp === 'string' ? formControlThemes[themeProp] : themeProp;
        const uncontrolled = value === undefined;
        const inputRef = useRef<HTMLInputElement>(null);

        const [focused, setFocused] = useState(restProps.autoFocus);
        const [stateValue, setStateValue] = useState(defaultValue || '');

        const filled = Boolean(uncontrolled ? stateValue : value);
        const [autofilled, setAutofilled] = useState(false);

        // отображаем крестик только для заполненного и активного инпута
        const clearButtonVisible = clear && filled && !disabled && !readOnly;

        const handleInputFocus = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                if (!readOnly) {
                    setFocused(true);
                }

                if (onFocus) {
                    onFocus(event);
                }
            },
            [onFocus, readOnly]
        );

        const handleInputBlur = useCallback(
            (event: FocusEvent<HTMLInputElement>) => {
                setFocused(false);

                if (onBlur) {
                    onBlur(event);
                }
            },
            [onBlur]
        );

        const handleInputChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                if (field && field.onChange) field.onChange(event);

                if (onChange) {
                    onChange(event, { value: event.target.value });
                }

                if (uncontrolled) {
                    setStateValue(event.target.value);
                }
            },
            [onChange, uncontrolled, field]
        );

        const handleClear = useCallback(
            (event: MouseEvent<HTMLButtonElement>) => {
                if (!clearButtonVisible) return;

                if (uncontrolled) {
                    setStateValue('');
                }

                if (onClear) {
                    onClear(event);
                }

                if (inputRef.current && !focused) {
                    inputRef.current.focus();
                }
            },
            [clearButtonVisible, focused, onClear, uncontrolled]
        );

        const handleAnimationStart = useCallback(
            (event: AnimationEvent<HTMLInputElement>) => {
                if (onAnimationStart) {
                    onAnimationStart(event);
                }

                setAutofilled(event.animationName.includes('start'));
            },
            [onAnimationStart]
        );

        useEffect(() => {
            if (uncontrolled) setStateValue(field?.value || '');
        }, [field?.value, uncontrolled, setStateValue]);

        const renderRightAddons = () => {
            const addonsVisible = clearButtonVisible || rightAddons || error;

            return (
                addonsVisible && (
                    <>
                        {clearButtonVisible && (
                            <div
                                css={{
                                    height: '100%',
                                    marginRight: rightAddons ? scale(1) : 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <button
                                    type="button"
                                    disabled={disabled}
                                    aria-label="Очистить"
                                    css={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: 0,
                                    }}
                                    onClick={handleClear}
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                        )}
                        {rightAddons}
                    </>
                )
            );
        };

        const css = useMemo(() => deepmerge.all<CSSObject>([BASE_INPUT_CSS, inputCSS]), [inputCSS]);

        const htmlFor = useId();

        return (
            <FormControl
                ref={wrapperRef}
                label={label}
                hint={hint}
                error={error}
                htmlFor={htmlFor}
                labelWrap={labelWrap}
                leftAddons={leftAddons}
                rightAddons={renderRightAddons()}
                filled={filled || autofilled || focused || !!placeholder?.length}
                focused={focused}
                block={block}
                readOnly={readOnly}
                disabled={disabled}
                className={className}
                css={{ cursor: disabled ? 'not-allowed' : 'text' }}
                theme={theme}
                size={size}
                variant={variant}
                labelCSS={labelCSS}
                bottomAddons={bottomAddons}
                leftAddonsCSS={leftAddonsCSS}
                rightAddonsCSS={rightAddonsCSS}
                showError={showError}
                fieldCSS={fieldCSS}
                wrapperCSS={wrapperCSS}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
            >
                {innerLeftAddons}
                <input
                    {...field}
                    {...restProps}
                    id={htmlFor}
                    className="control"
                    placeholder={placeholder}
                    css={css}
                    disabled={disabled}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    onChange={handleInputChange}
                    onAnimationStart={handleAnimationStart}
                    ref={mergeRefs([ref, inputRef])}
                    type={type}
                    value={uncontrolled ? stateValue : value}
                    readOnly={readOnly}
                    aria-label={typeof label === 'string' ? label : undefined}
                />
            </FormControl>
        );
    }
);

Input.displayName = 'Input';
