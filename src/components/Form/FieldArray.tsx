import type { LayoutProps } from '@greensight/gds/types/src/components/Layout';
import type { FC, ReactNode } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button, Layout, scale } from '@scripts/gds';

import IconPlus from '@icons/plus.svg';
import DeleteIcon from '@icons/small/trash.svg';

import useForm from './useForm';

export interface FieldArrayAddProps {
    onClick: () => void;
    disabled?: boolean;
}

export interface FieldArrayRemoveProps {
    onClick: () => void;
    disabled?: boolean;
}

const DefaultAddButton = (props: FieldArrayAddProps) => (
    <Button Icon={IconPlus} {...props}>
        Добавить
    </Button>
);

const DefaultRemoveButton = (props: FieldArrayRemoveProps) => (
    <Button Icon={DeleteIcon} theme="outline" hidden {...props}>
        Удалить
    </Button>
);

type FieldArrayProps = Omit<LayoutProps, 'reverse' | 'wrap'> & {
    type?: 'grid';
    AddButton?: FC<FieldArrayAddProps>;
    RemoveButton?: FC<FieldArrayRemoveProps>;
    name: string;
    isAddedElement?: boolean;
    maxCount?: number;
    children: (args: { name: string; index: number }) => ReactNode;
    initialValue?: any;
    className?: string;
};

const FormFieldArray = ({
    AddButton = DefaultAddButton,
    RemoveButton = DefaultRemoveButton,
    name,
    maxCount,
    isAddedElement = true,
    initialValue,
    className,
    children,
    ...props
}: FieldArrayProps) => {
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
                        <Layout.Item>{children({ name: `${name}[${index}]`, index })}</Layout.Item>
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
