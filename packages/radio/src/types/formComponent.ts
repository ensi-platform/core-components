import type { RadioSizesEnum, RadioVariantsEnum } from 'src/scripts';

import type { IRadioProps } from './component';
import type { IFormRadioWrapperProps, IFormRadioWrapperReturn } from './formComponentWrapper';

export interface IFormRadioProps
    extends Omit<IFormRadioWrapperProps, 'children'>,
        Omit<
            IRadioProps<typeof RadioVariantsEnum, typeof RadioSizesEnum>,
            keyof Omit<IFormRadioWrapperProps, 'children'> | keyof IFormRadioWrapperReturn | 'ref'
        > {}
