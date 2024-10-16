import { HTMLAttributes } from 'react';
import { LinkColorType } from '@greensight/core-components-common';

export interface ICopyButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
    /**
     * The text content that can be copied
     */
    children: string;
    /**
     * The duration of the success check mark display
     */
    timeout?: number;
    /**
     * Link color type
     */
    linkStyle?: LinkColorType;
}
