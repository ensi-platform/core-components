import { FC, useCallback, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { FieldProps, Field as DefaultField } from '@greensight/core-components-select';
import { scale } from '@greensight/gds';
import { IconSmallClosed, defaultTheme } from '@greensight/core-components-common';

const { colors } = defaultTheme;

export interface useSelectClearProps {
    Field?: FC<FieldProps>;
    closeOnClear?: boolean;
    onClearClick?: () => void;
    disabled?: boolean;
}

export const useSelectClear = ({
    Field = DefaultField,
    closeOnClear = false,
    onClearClick,
    disabled,
}: useSelectClearProps = {}) => {
    const fieldRef = useRef<HTMLDivElement | null>(null);
    const renderField = useCallback(
        (props: FieldProps) => (
            <Field
                {...props}
                innerProps={{
                    ...props.innerProps,
                    ref: mergeRefs([props.innerProps.ref!, fieldRef]),
                }}
                rightAddonsCSS={{
                    ...props.rightAddonsCSS,
                    gap: scale(1, true),
                }}
                rightAddons={
                    <>
                        {!!props.selected?.length && props.selected && !disabled && (
                            <>
                                <button
                                    type="button"
                                    onClick={e => {
                                        if (onClearClick) onClearClick();
                                        e.stopPropagation();

                                        props.setSelectedItems([]);

                                        setTimeout(() => {
                                            fieldRef.current?.focus();
                                        }, 0);

                                        if (closeOnClear && props.isOpen) {
                                            setTimeout(() => {
                                                props.toggleMenu();
                                            }, 0);
                                        }
                                    }}
                                    css={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        ':hover': {
                                            opacity: 0.5,
                                        },
                                    }}
                                >
                                    <IconSmallClosed />
                                </button>
                                <span
                                    css={{
                                        display: 'inline-block',
                                        width: 1,
                                        height: scale(2),
                                        borderWidth: 0,
                                        background: colors.grey600,
                                    }}
                                />
                            </>
                        )}
                        {props.rightAddons}
                    </>
                }
            />
        ),
        [Field, closeOnClear, disabled]
    );

    return {
        Field: renderField,
    };
};

export default useSelectClear;
