import { forwardRef } from 'react';

import { VISUALLY_HIDDEN_CSS } from '../scripts/helpers';
import { RatingStarProps } from '../types';

export const RatingStar = forwardRef(
    (
        {
            StarIcon,
            id: ratingId,
            name,
            itemValue,
            isFilled,
            isChecked,
            isReadonly,
            iconWrapperCSS,
            iconCSS,
            className,
            disabled,
            showReadOnlyEmptyStar,
            onChange,
            onBlur,
            onFocus,
            onClick,
            getLabelText,
            onMouseOver,
            onMouseOut,
            ...props
        }: RatingStarProps,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ref
    ) => {
        delete props.css;
        const id = `${ratingId}-${itemValue}`;

        if (isReadonly) {
            return isFilled || showReadOnlyEmptyStar ? (
                <span css={iconWrapperCSS} className={className}>
                    <StarIcon css={iconCSS} />
                </span>
            ) : null;
        }

        const changeHandler = () => {
            if (!onChange || isReadonly) {
                return;
            }
            onChange(itemValue);
        };

        return (
            <>
                <label
                    htmlFor={id}
                    css={iconWrapperCSS}
                    className={className}
                    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                    onMouseOver={onMouseOver}
                    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                    onMouseOut={onMouseOut}
                    {...props}
                >
                    <StarIcon css={iconCSS} />
                    {getLabelText && <span css={VISUALLY_HIDDEN_CSS}>{getLabelText(itemValue)}</span>}
                </label>
                <input
                    type="radio"
                    value={itemValue}
                    checked={isChecked}
                    disabled={disabled}
                    name={name}
                    id={id}
                    css={VISUALLY_HIDDEN_CSS}
                    onChange={changeHandler}
                    onInput={changeHandler}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onClick={onClick}
                />
            </>
        );
    }
);
