import { HTMLAttributes, forwardRef } from 'react';

import { FormFieldDescendantProps, IconSmallImport, scale, defaultTheme, Button } from '@greensight/core-components-common';

interface DropzoneAreaProps extends HTMLAttributes<HTMLDivElement>, FormFieldDescendantProps {
    inputFieldProps: HTMLAttributes<HTMLInputElement>;
    disabled?: boolean;
    /** Button-like view */
    simple?: boolean;
}

const { colors } = defaultTheme;

const DropzoneArea = forwardRef<HTMLDivElement, DropzoneAreaProps>(
    ({ disabled, inputFieldProps, simple, meta, ...props }, ref) =>
        simple ? (
            <div
                {...props}
                ref={ref}
                onBlur={(...args: [any]) => {
                    if (typeof props.onBlur === 'function') props.onBlur(...args);
                    if (typeof inputFieldProps.onBlur === 'function') {
                        inputFieldProps.onBlur(...args);
                    }
                }}
            >
                <input {...inputFieldProps} disabled={disabled} />
                <Button Icon={IconSmallImport} type="button" disabled={disabled} theme="secondary">
                    Загрузить
                </Button>
            </div>
        ) : (
            <div
                {...props}
                onBlur={(...args: [any]) => {
                    if (typeof props.onBlur === 'function') props.onBlur(...args);
                    if (typeof inputFieldProps.onBlur === 'function') {
                        inputFieldProps.onBlur(...args);
                    }
                }}
                css={{
                    display: 'grid',
                    placeItems: 'center',
                    border:
                        meta?.error ? `1px solid ${colors?.danger}` : `1px dashed ${colors.grey300}`,
                    // borderRadius: IT?.borderRadius,
                    // background: IT?.bg,
                    padding: scale(2),
                    textAlign: 'center',
                    transition: 'background 200ms ease-out',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    ...(!disabled && {
                        ':hover': { background: colors?.infoBg },
                    }),
                }}
                ref={ref}
            >
                <input {...inputFieldProps} disabled={disabled} />
                <IconSmallImport width={scale(4)} height={scale(4)} css={{ marginBottom: scale(1) }} />
                <p>
                    Нажмите для загрузки файла <br />
                    или перетащите его в&nbsp;эту область
                </p>
            </div>
        )
);

export default DropzoneArea;
