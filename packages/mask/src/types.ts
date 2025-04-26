import type { IFormFieldComponent } from '@ensi-platform/core-components-form';
import { type TInputProps } from '@ensi-platform/core-components-input';

import { type FactoryOpts } from 'imask';

/** Mask props */
export type TMaskProps = {
    /** Mask for input */
    opts: FactoryOpts;
    /** Change handler */
    onChange?: (e: { target: { value: string } }) => void;
} & TInputProps;

/**
 * Mask form component props
 */
export type TFormFieldMaskProps = Omit<TMaskProps & IFormFieldComponent, 'value' | 'defaultValue' | 'error'>;
