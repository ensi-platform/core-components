import { CSSObject } from '@emotion/react';
import deepmerge from 'deepmerge';
import { nanoid } from 'nanoid';
import { MouseEvent, FocusEvent, useCallback, useMemo, useRef, useState } from 'react';

import { useThemeCSSPart, IconStar, useIsFocusVisible } from '@greensight/core-components-common';
import mergeRefs from 'react-merge-refs';

import { FormControl } from '@greensight/core-components-form-control';
import { VISUALLY_HIDDEN_CSS, clamp, roundValueToPrecision } from './scripts/helpers';
import { RatingStar } from './components/Star';
import { ratingThemes } from './themes';
import { RatingProps, RatingThemeState } from './types';

export * from './types';

const emptyCSS: CSSObject = {};

export const Rating = ({
    value: propsValue,
    onChange,
    onHoverChange,
    getLabelText = val => `${val} звезд.`,
    showReadOnlyEmptyStar = true,
    disabled = false,
    readOnly = false,
    className,
    name = 'rating',
    precision = 1,
    size = 'sm',
    containerCSS = emptyCSS,
    fractionWrapperCSS = emptyCSS,
    iconCSS = emptyCSS,
    iconWrapperCSS = emptyCSS,
    theme: themeProp = 'basic',
    variant = 'primary',
    label = '',
    StarIcon = IconStar,
    onMouseMove,
}: RatingProps) => {
    const theme = typeof themeProp === 'string' ? ratingThemes[themeProp] : themeProp;

    const innerValue = propsValue || 0;

    if (!onChange && !readOnly) {
        console.error('Rating component in non-readonly mode requires onChange');
    }

    const id = useMemo(() => name || nanoid(4), [name]);

    const [{ hoveredValue, focusedValue }, setState] = useState({
        hoveredValue: -1,
        focusedValue: -1,
    });

    const valueRounded = roundValueToPrecision(innerValue, precision);

    let value = valueRounded;
    if (hoveredValue !== -1) value = hoveredValue;
    if (focusedValue !== -1) value = focusedValue;

    const rootRef = useRef<HTMLDivElement>(null);
    const {
        isFocusVisibleRef,
        onBlur: handleBlurVisible,
        onFocus: handleFocusVisible,
        ref: focusVisibleRef,
    } = useIsFocusVisible();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [focusVisible, setFocusVisible] = useState(false);
    const ref = mergeRefs([rootRef, focusVisibleRef]);

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (onMouseMove) {
                onMouseMove(event);
            }

            const rootNode = rootRef.current;
            if (!rootNode) return;

            const { left, width: containerWidth } = rootNode.getBoundingClientRect();
            const percent = (event.clientX - left) / containerWidth;

            let newHover = roundValueToPrecision(5 * percent + precision / 2, precision);
            newHover = clamp(newHover, precision, 5);

            onHoverChange?.(event, { value: newHover });

            setState(prev =>
                prev.hoveredValue === newHover && prev.focusedValue === newHover
                    ? prev
                    : {
                          hoveredValue: newHover,
                          focusedValue: newHover,
                      }
            );
        },
        [onHoverChange, onMouseMove, precision]
    );

    const handleMouseLeave = (event: MouseEvent) => {
        const newHover = -1;
        onHoverChange?.(event, { value: newHover });

        setState({
            hoveredValue: newHover,
            focusedValue: newHover,
        });
    };

    const handleFocus = (event: FocusEvent<any>) => {
        handleFocusVisible(event);
        if (isFocusVisibleRef.current === true) {
            setFocusVisible(true);
        }

        const newFocus = parseFloat(event.target.value);
        setState(prev => ({
            hoveredValue: prev.hoveredValue,
            focusedValue: newFocus,
        }));
    };

    const handleBlur = (event: FocusEvent<any>) => {
        if (hoveredValue !== -1) {
            return;
        }

        handleBlurVisible(event);
        if (isFocusVisibleRef.current === false) {
            setFocusVisible(false);
        }

        const newFocus = -1;
        setState(prev => ({
            hoveredValue: prev.hoveredValue,
            focusedValue: newFocus,
        }));
    };

    const handleChange = useCallback(
        (val: number) => {
            let newValue = val;
            // Mouse priority over keyboard
            if (hoveredValue !== -1) {
                newValue = hoveredValue;
            }

            if (onChange) {
                onChange({ target: { value: newValue } });
            }
        },
        [hoveredValue, onChange]
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [emptyValueFocused, setEmptyValueFocused] = useState(false);

    const state = useMemo<Omit<RatingThemeState, 'theme'>>(
        () => ({
            disabled,
            label,
            precision,
            readOnly,
            showReadOnlyEmptyStar,
            size,
            value,
            variant,
        }),
        [disabled, label, precision, readOnly, showReadOnlyEmptyStar, size, value, variant]
    );

    const getCSS = useThemeCSSPart(theme, state);

    const totalContainerCSS = useMemo(
        () => deepmerge.all<CSSObject>([getCSS('container'), containerCSS]),
        [containerCSS, getCSS]
    );

    const totalFractionWrapperCSS = useMemo(
        () => deepmerge.all<CSSObject>([getCSS('fractionWrapper'), fractionWrapperCSS]),
        [fractionWrapperCSS, getCSS]
    );

    return (
        <FormControl
            label={label}
            fieldCSS={{ background: 'none' }}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={className}
                css={totalContainerCSS}
                {...(readOnly && { role: 'img', 'aria-label': getLabelText(value || 0) })}
            >
                {Array(5)
                    .fill(undefined)
                    .map((_, i) => {
                        const isLast = i === 4;
                        const itemValue = i + 1;
                        const isActive = itemValue === Math.floor(value) && hoveredValue !== -1 && focusedValue !== -1;

                        const isFraction = precision < 1;

                        const isChecked = itemValue === innerValue;
                        const isFilled = itemValue <= value;
                        const isHovered = itemValue <= hoveredValue;
                        const isFocusVisible = itemValue <= focusedValue;

                        const starState = {
                            isActive,
                            isChecked,
                            isFilled,
                            isFocusVisible,
                            isHovered,
                            isLast,
                        };

                        const starProps = {
                            StarIcon,
                            id,
                            showReadOnlyEmptyStar,
                            name,
                            isReadonly: readOnly,
                            disabled,
                            itemValue,
                            onChange: handleChange,
                            iconWrapperCSS: deepmerge.all<CSSObject>([
                                getCSS('iconWrapper', starState),
                                iconWrapperCSS,
                            ]),
                            iconCSS: deepmerge.all<CSSObject>([getCSS('icon', starState), iconCSS]),
                            getLabelText,
                            onBlur: handleBlur,
                            onFocus: handleFocus,
                            onClick: (event: MouseEvent<any>) => {
                                // Ignore keyboard events
                                // https://github.com/facebook/react/issues/7407
                                if (event.clientX === 0 && event.clientY === 0) {
                                    return;
                                }

                                setState({
                                    hoveredValue: -1,
                                    focusedValue: -1,
                                });

                                if (innerValue === itemValue) {
                                    handleChange(0);
                                }
                            },
                        };

                        if (isFraction) {
                            const items = Array.from(new Array(1 / precision));

                            return (
                                <div key={itemValue} css={totalFractionWrapperCSS}>
                                    {items.map((__, indexDecimal) => {
                                        const itemDecimalValue = roundValueToPrecision(
                                            itemValue - 1 + (indexDecimal + 1) * precision,
                                            precision
                                        );

                                        return (
                                            <>
                                                <RatingStar
                                                    {...starProps}
                                                    itemValue={itemDecimalValue}
                                                    iconWrapperCSS={deepmerge.all<CSSObject>([
                                                        getCSS('iconWrapper', starState),
                                                        iconWrapperCSS,
                                                        {
                                                            display: 'block',
                                                            position: 'absolute',
                                                            pointerEvents: 'none',
                                                            zIndex: 1,
                                                        },
                                                    ])}
                                                    showReadOnlyEmptyStar
                                                    readOnly
                                                />
                                                <RatingStar
                                                    {...starProps}
                                                    itemValue={itemDecimalValue}
                                                    iconWrapperCSS={deepmerge.all<CSSObject>([
                                                        getCSS('iconWrapper', { ...starState, isFilled: true }),
                                                        iconWrapperCSS,
                                                        {
                                                            display: 'block',
                                                            position: 'absolute',
                                                            overflow: 'hidden',
                                                            zIndex: 2,
                                                            width: (() => {
                                                                if (itemDecimalValue === value)
                                                                    return `${(indexDecimal + 1) * precision * 100}%`;
                                                                if (itemDecimalValue < value) return '100%';

                                                                return '0%';
                                                            })(),
                                                        },
                                                    ])}
                                                />
                                            </>
                                        );
                                    })}
                                </div>
                            );
                        }

                        return <RatingStar key={itemValue} {...starProps} />;
                    })}
                {!readOnly && !disabled && (
                    <label>
                        <input
                            type="radio"
                            css={VISUALLY_HIDDEN_CSS}
                            value="0"
                            name={name}
                            id={`${id}-empty`}
                            checked={innerValue === 0}
                            onFocus={() => setEmptyValueFocused(true)}
                            onBlur={() => setEmptyValueFocused(false)}
                            onChange={e => handleChange(e.target.value === '' ? 0 : +e.target.value)}
                        />
                        <span css={VISUALLY_HIDDEN_CSS}>{getLabelText(0)}</span>
                    </label>
                )}
            </div>
        </FormControl>
    );
};
