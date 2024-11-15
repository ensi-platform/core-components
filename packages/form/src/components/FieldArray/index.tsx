import {
    Button,
    IconSmallPlus as IconPlus,
    IconSmallTrash as IconTrash,
    Layout,
    scale,
} from '@ensi-platform/core-components-common';

import { type FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import useForm from '../../context/form';
import type { IButtonProps, IFieldArrayProps } from './types';

const DefaultAddButton: FC<IButtonProps> = props => (
    <Button Icon={IconPlus} {...props}>
        Добавить
    </Button>
);

const DefaultRemoveButton: FC<IButtonProps> = props => (
    <Button Icon={IconTrash} theme="outline" hidden {...props}>
        Удалить
    </Button>
);

/**
 * FieldArray - is a wrapper for an array of similar fields, controlled with RHF
 */
export const FormFieldArray = ({
    name,
    maxCount,
    initialValue,
    className,
    children,
    childrenCol,
    AddButton = DefaultAddButton,
    RemoveButton = DefaultRemoveButton,
    canAddElement = true,
    ...props
}: IFieldArrayProps) => {
    const { control } = useFormContext();
    const { disabled } = useForm()!;
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });
    const { length } = fields;
    const isInLimits = typeof maxCount === 'undefined' || length < maxCount;

    return (
        <div css={{ gap: scale(2) }}>
            {fields.map((el: any, index: number) => {
                const isOneField = length === 1;

                return (
                    <Layout
                        key={el.id}
                        cols={canAddElement && !isOneField ? [1, `${scale(5)}px`] : 1}
                        css={{
                            alignItems: 'center',
                            marginBottom: scale(2),
                        }}
                        gap={scale(2)}
                        className={className}
                        {...props}
                    >
                        <Layout.Item col={childrenCol}>{children({ name: `${name}[${index}]`, index })}</Layout.Item>
                        {canAddElement && !isOneField && (
                            <Layout.Item>
                                <RemoveButton onClick={() => remove(index)} disabled={disabled} />
                            </Layout.Item>
                        )}
                    </Layout>
                );
            })}
            {canAddElement && isInLimits && <AddButton onClick={() => append(initialValue)} disabled={disabled} />}
        </div>
    );
};

export default FormFieldArray;
