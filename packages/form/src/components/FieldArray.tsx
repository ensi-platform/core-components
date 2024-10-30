import type { FC, ReactNode } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { LayoutProps, Button, Layout, scale } from '@ensi-platform/core-components-common';
import { LayoutItemProps } from '@greensight/gds/types/src/components/Layout/Item';
import useForm from '../hooks/useForm';

export interface FieldArrayAddProps {
    onClick: () => void;
    disabled?: boolean;
}

export interface FieldArrayRemoveProps {
    onClick: () => void;
    disabled?: boolean;
}

const DefaultAddButton = (props: FieldArrayAddProps) => <Button {...props}>Добавить</Button>;

const DefaultRemoveButton = (props: FieldArrayRemoveProps) => (
    <Button theme="outline" hidden {...props}>
        Удалить
    </Button>
);

type FieldArrayProps = Omit<LayoutProps, 'reverse' | 'wrap' | 'children'> & {
    type?: 'grid';
    AddButton?: FC<FieldArrayAddProps>;
    RemoveButton?: FC<FieldArrayRemoveProps>;
    name: string;
    isAddedElement?: boolean;
    maxCount?: number;
    children: (args: { name: string; index: number }) => ReactNode | ReactNode[];
    initialValue?: any;
    className?: string;
    childrenCol?: LayoutItemProps['col'];
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
    childrenCol,
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
