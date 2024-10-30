import { ChangeEvent, MutableRefObject, ReactNode } from 'react';
import { TagComponent } from '../../types';

export type TagListOwnProps = {
    value?: string;
    handleDeleteTag?: (key: string) => void;
    onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
    inputRef?: MutableRefObject<HTMLInputElement>;
    autocomplete?: boolean;
    isPopoverOpen?: boolean;
    collapseTagList?: boolean;
    moveInputToNewLine?: boolean;
    transformCollapsedTagText?: (collapsedCount: number) => string;
    transformTagText?: (tagText?: ReactNode) => ReactNode;
    Tag?: TagComponent;
    handleUpdatePopover?: () => void;
    rightAddons?: ReactNode;
    isLoading?: boolean;
    overflow?: 'grow-height' | 'truncate';
    collapseOnClose?: boolean;
    disabled?: boolean;
};
