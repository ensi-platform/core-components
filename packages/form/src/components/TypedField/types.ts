import type { InputProps } from '@ensi-platform/core-components-input';

export type DataType = 'string' | 'number';
export type FieldType = 'positiveInt' | 'positiveFloat';

export interface ITypedFieldProps extends Omit<InputProps, 'children'> {
    /** Name of field */
    name: string;
    /** Value transformation type  */
    fieldType?: FieldType;
    /** Return value type */
    dataType?: DataType;
}
