import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button, Layout, scale } from '@greensight/gds';
import { type FC } from 'react';
import useForm from '../../context/form';
import { type IButtonProps, type IFieldArrayProps } from './types';

const DefaultAddButton: FC<IButtonProps> = props => (
    <Button {...props} type="button">
        Добавить
    </Button>
);

const DefaultRemoveButton: FC<IButtonProps> = props => (
    <Button theme="outline" hidden {...props}>
        Удалить
    </Button>
);

const FormFieldArray = ({
    AddButton = DefaultAddButton,
    RemoveButton = DefaultRemoveButton,
    name,
    maxCount,
    isAddedElement = true,
    initialValue,
    className,
    children,
    childrenCol,
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
                        cols={isAddedElement && !isOneField ? [1, `${scale(5)}px`] : 1}
                        css={{
                            alignItems: 'center',
                            marginBottom: scale(2),
                        }}
                        gap={scale(2)}
                        className={className}
                        {...props}
                    >
                        <Layout.Item col={childrenCol}>{children({ name: `${name}[${index}]`, index })}</Layout.Item>
                        {isAddedElement && !isOneField && (
                            <Layout.Item>
                                <RemoveButton onClick={() => remove(index)} disabled={disabled} />
                            </Layout.Item>
                        )}
                    </Layout>
                );
            })}
            {isAddedElement && isInLimits && <AddButton onClick={() => append(initialValue)} disabled={disabled} />}
        </div>
    );
};

export default FormFieldArray;
