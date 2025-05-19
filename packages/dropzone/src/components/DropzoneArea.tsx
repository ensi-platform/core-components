import { Button, IconSmallImport, defaultTheme, scale } from '@ensi-platform/core-components-common';
import type { IFieldWrapperProps } from '@ensi-platform/core-components-form';

import { type HTMLAttributes, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { FileType } from './DropzoneFile';

interface DropzoneAreaProps extends HTMLAttributes<HTMLDivElement>, Partial<IFieldWrapperProps<FileType[]>> {
    inputFieldProps: HTMLAttributes<HTMLInputElement>;
    disabled?: boolean;
    /** Button-like view */
    simple?: boolean;
}

const { colors } = defaultTheme;

const DropzoneArea = forwardRef<HTMLDivElement, DropzoneAreaProps>(
    ({ disabled, inputFieldProps, simple, error, ...props }, ref) => {
        const { t } = useTranslation('translation');
        return simple ? (
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
                    {t('translation:upload')}
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
                    border: error ? `1px solid ${colors?.danger}` : `1px dashed ${colors.grey300}`,
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
                    {t('translation:clickToLoad')} <br />
                    {t('translation:orDrag')}
                </p>
            </div>
        );
    }
);

export default DropzoneArea;
