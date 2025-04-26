import type { Dispatch, HTMLProps, SetStateAction } from 'react';

export interface IPasswordButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'children' | 'type'> {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}
