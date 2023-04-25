import { ChangeEvent, Children, FC, cloneElement, forwardRef, isValidElement, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import Input from '@components/Input';

import type { FieldProps } from '.';
import { FormFieldProps, useFormikCompatibleFieldProps } from './Field';
import useForm from './useForm';

export interface TypedFieldProps extends FormFieldProps {
    fieldType?: 'positiveInt' | 'positiveFloat';
}

export const TypedField = forwardRef<HTMLInputElement, TypedFieldProps>(
    ({ name, children, size = 'md', className, wrapperCSS, block = true, fieldType, ...props }, ref) => {
        const { onChange, disabled } = useForm()!;
        const { control, setValue, trigger, setError } = useFormContext(); // retrieve all hook methods
        const { field, fieldState: fieldStateForm } = useController({
            name,
            control,
        });

        const fieldState = useMemo(
            () => ({
                ...fieldStateForm,
                error: Array.isArray(fieldStateForm.error) ? fieldStateForm.error[0] : fieldStateForm.error,
            }),
            [fieldStateForm]
        );

        const isCheckbox = isValidElement(children) && (children?.type as FC)?.name === 'Checkbox';
        const isRadio = isValidElement(children) && (children?.type as FC)?.name === 'Radio';
        const inputProps = {
            name,
            size,
            error: fieldState.error?.message,
            value: field.value,
            onBlur: field.onBlur,
            ref,
            label: props.label,
            ...(!isCheckbox && !isRadio && { isLegend: true, label: '' }),
            disabled,
            ...props,
        };

        const transformValue = useCallback(
            (val: any) => {
                if (typeof val !== 'string') return val;

                if (fieldType === 'positiveInt') {
                    return val.replace(/[^\d]+/g, '');
                }

                if (fieldType === 'positiveFloat') {
                    return val.replace(/[^.\d]+/g, '').replace(/^([^.]*\.)|\./g, '$1');
                }

                return val;
            },
            [fieldType]
        );

        const onChangeHandler = useCallback(
            (e?: ChangeEvent<any>, initialValue?: any) => {
                const val = transformValue(initialValue || e?.target.value);
                if (e?.currentTarget) {
                    e.currentTarget.value = val;
                }
                if (e?.target) {
                    e.target.value = val;
                }
                field.onChange(e);
                onChange(name, val);
            },
            [field, onChange, transformValue, name]
        );

        const fieldProps = useFormikCompatibleFieldProps({
            error: inputProps.error,
            field,
            isTouched: fieldState.isTouched,
            name,
            onChangeHandler,
            setError,
            setValue,
            trigger,
        });

        return (
            <div css={{ width: '100%' }} className={className}>
                {children ? (
                    <>
                        {Children.map(children, child => {
                            if (isValidElement<any>(child)) {
                                const formikProps: FieldProps<any> = {
                                    ...fieldProps,
                                    id: (child?.type as FC)?.displayName !== 'Legend' ? name : '',
                                    ...inputProps,
                                    ...child.props,
                                };
                                return cloneElement(child, { ...formikProps });
                            }
                        })}
                    </>
                ) : (
                    <Input
                        block={block}
                        wrapperCSS={wrapperCSS}
                        onInput={e => {
                            field.onChange(e);
                            onChangeHandler(e);
                        }}
                        onClear={() => {
                            setValue(name, '');
                            onChangeHandler(undefined, '');
                        }}
                        {...inputProps}
                    />
                )}
            </div>
        );
    }
);

TypedField.displayName = 'TypedField';

export default TypedField;
