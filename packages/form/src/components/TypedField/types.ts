import type { FormFieldProps } from '@ensi-platform/core-components-form';

export type DataType = 'string' | 'number';

export interface TypedFieldProps extends FormFieldProps {
    fieldType?: 'positiveInt' | 'positiveFloat';
    dataType?: DataType;
}
