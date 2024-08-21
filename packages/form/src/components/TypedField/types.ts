import { type IFormFieldProps } from '../Field/types';

export type DataType = 'string' | 'number';
export type FieldType = 'positiveInt' | 'positiveFloat';

export interface ITypedFieldProps extends IFormFieldProps {
    fieldType?: FieldType;
    dataType?: DataType;
}
