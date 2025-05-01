import type { IFormFieldComponent } from '@ensi-platform/core-components-form';
import type { TInputProps } from '@ensi-platform/core-components-input';

/**
 * Password field props
 */
export interface IPasswordProps extends TInputProps {}

/**
 * Password form component props
 */
export type TFormPasswordFieldProps = Omit<IPasswordProps & IFormFieldComponent, 'value' | 'defaultValue' | 'error'>;
