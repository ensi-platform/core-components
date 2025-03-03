import { IconSmallClosed, defaultTheme, scale } from '@ensi-platform/core-components-common';

import {
    type FC,
    type MouseEvent as ReactMouseEvent,
    type ReactNode,
    type RefObject,
    useCallback,
    useRef,
} from 'react';
import mergeRefs from 'react-merge-refs';

import type { FieldProps } from '../../types';
import { Field as DefaultField } from '../Field';

const { colors } = defaultTheme;

export interface useSelectClearProps {
    Field?: FC<FieldProps>;
    closeOnClear?: boolean;
    onClearClick?: () => void;
    disabled?: boolean;
}

interface IClearableFieldProps extends FieldProps {
    Field?: FC<FieldProps>;
    children?: ReactNode;
    fieldRef: RefObject<HTMLDivElement>;
    disabled?: boolean;
}

const ClearableField = ({ Field = DefaultField, children, fieldRef, disabled, ...props }: IClearableFieldProps) => (
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
                {!!props.selected?.length && props.selected && !disabled && children}
                {props.rightAddons}
            </>
        }
    />
);

export const useSelectClear = ({
    Field = DefaultField,
    closeOnClear = false,
    onClearClick,
    disabled,
}: useSelectClearProps = {}) => {
    const fieldRef = useRef<HTMLDivElement | null>(null);
    const onClearClickRef = useRef(onClearClick);

    onClearClickRef.current = onClearClick;

    const handleClear = useCallback(
        (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, props: FieldProps) => {
            onClearClickRef.current?.(); // Call the latest `onClearClick`
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
        },
        [closeOnClear]
    );

    const clearButton = useCallback(
        (props: FieldProps) => (
            <>
                <button
                    type="button"
                    onClick={e => handleClear(e, props)}
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
        ),
        [handleClear]
    );

    const renderField = useCallback(
        (props: FieldProps) => (
            <ClearableField {...props} disabled={disabled} fieldRef={fieldRef} Field={Field}>
                {clearButton(props)}
            </ClearableField>
        ),
        [Field, clearButton, disabled]
    );

    return {
        Field: renderField,
    };
};

export default useSelectClear;
