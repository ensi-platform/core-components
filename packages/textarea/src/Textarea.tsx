import { defaultTheme, scale } from '@ensi-platform/core-components-common';
import { FormControl } from '@ensi-platform/core-components-form-control';

import type { CSSObject } from '@emotion/react';

import deepmerge from 'deepmerge';
import { type ChangeEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-textarea-autosize';

import type { ITextareaProps } from './types';

const emptyStyle = {};

export const BASE_CSS: CSSObject = {
    border: `none`,
};

const { colors } = defaultTheme;

export const Textarea = ({
    name,
    value,
    field,
    minRows = 3,
    maxRows,
    maxLength = 0,
    threshold = 0,
    isResize = false,
    label,
    bottomAddons,
    disabled,
    labelWrap,
    error,
    hint,
    className,
    textAreaCSS = emptyStyle,
    labelCSS = emptyStyle,
    leftAddonsCSS = emptyStyle,
    rightAddonsCSS = emptyStyle,
    leftAddons,
    rightAddons,
    wrapperRef,
    readOnly,
    showError = true,
    fieldCSS = emptyStyle,
    wrapperCSS = emptyStyle,
    block = true,
    onHeightChange,
    cacheMeasurements = false,
    ...props
}: ITextareaProps) => {
    const { t } = useTranslation('translation');

    const [lenEnd, setLenEnd] = useState(maxLength);
    const [isExceed, setExceed] = useState(false);

    const handlerInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (maxLength) {
            const valLen = e.target.value.length;
            setLenEnd(maxLength - valLen);
            setExceed(valLen >= Math.max(maxLength, 0) * (Math.min(Math.max(threshold, 0), 100) / 100));
        }
    };

    const renderError = useMemo(
        () =>
            error ||
            (Number.isInteger(maxLength) && isExceed && lenEnd < 0
                ? `${t('translation:moreThan')} ${Math.abs(lenEnd)}`
                : ''),
        [maxLength, lenEnd, error, isExceed, t]
    );

    const renderHint = useMemo(
        () =>
            hint ||
            (Number.isInteger(maxLength) && isExceed && lenEnd > 0
                ? `${t('translation:remained')} ${Math.abs(lenEnd)}`
                : ''),
        [maxLength, lenEnd, hint, isExceed, t]
    );

    // TODO: react 18 useId()
    const htmlFor = props.id;

    const innerCSS = useMemo(() => deepmerge.all<CSSObject>([BASE_CSS, fieldCSS]), [fieldCSS]);

    return (
        <FormControl
            htmlFor={htmlFor}
            ref={wrapperRef}
            className={className}
            css={{ cursor: disabled ? 'not-allowed' : 'text' }}
            labelCSS={labelCSS}
            disabled={disabled}
            labelWrap={labelWrap}
            readOnly={readOnly}
            error={renderError}
            label={label}
            hint={renderHint}
            leftAddons={leftAddons}
            rightAddons={rightAddons}
            bottomAddons={bottomAddons}
            leftAddonsCSS={leftAddonsCSS}
            rightAddonsCSS={rightAddonsCSS}
            showError={showError}
            fieldCSS={innerCSS}
            wrapperCSS={wrapperCSS}
            block={block}
            {...props}
        >
            <TextareaAutosize
                className="control"
                name={name}
                value={value as string}
                minRows={minRows}
                maxRows={maxRows}
                {...field}
                onInput={handlerInput}
                disabled={disabled}
                aria-describedby={isExceed ? 'exceeding-characters-info' : ''}
                onHeightChange={onHeightChange}
                cacheMeasurements={cacheMeasurements}
                css={{
                    display: 'block',
                    width: '100%',
                    padding: scale(1),
                    borderRadius: 2,
                    background: colors?.grey100,
                    borderColor: error ? colors?.danger : colors?.grey400,
                    ':focus': { borderColor: colors?.primary, outline: 'none' },
                    ...(!isResize && { resize: 'none' }),
                    ':disabled': { cursor: 'not-allowed' },
                    ...textAreaCSS,
                }}
            />
        </FormControl>
    );
};

export default Textarea;
