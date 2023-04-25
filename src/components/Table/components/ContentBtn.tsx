import { FC, HTMLProps, ReactNode, useMemo } from 'react';

import { SVGRIcon } from '@customTypes/index';

import { colors, scale, typography } from '@scripts/gds';

import CopyIcon from '@icons/small/copy.svg';
import EditIcon from '@icons/small/edit.svg';
import ExportIcon from '@icons/small/export.svg';
import EyeIcon from '@icons/small/eyeOff.svg';
import MessageIcon from '@icons/small/message.svg';
import TrashIcon from '@icons/small/trash.svg';

export interface ContentBtnProps extends HTMLProps<HTMLButtonElement> {
    type?: 'edit' | 'copy' | 'export' | 'delete' | 'hide' | 'message';
    children: ReactNode;
    Icon?: SVGRIcon;
    className?: string;
}

export const ContentBtn: FC<ContentBtnProps> = ({ type, children, Icon, ...props }) => {
    const IconComponent = useMemo(() => {
        if (Icon) return Icon;

        switch (type) {
            case 'copy':
                return CopyIcon;
            case 'export':
                return ExportIcon;
            case 'delete':
                return TrashIcon;
            case 'edit':
                return EditIcon;
            case 'hide':
                return EyeIcon;
            case 'message':
                return MessageIcon;
            default:
                return '';
        }
    }, [type, Icon]);
    return (
        <button
            type="button"
            css={{
                ...typography('bodySm'),
                height: scale(4),
                width: '100%',
                textAlign: 'left',
                padding: `${scale(1, true)}px ${scale(1)}px`,
                svg: { marginRight: scale(1, true), verticalAlign: 'top' },
                ':hover': { background: colors.infoBg },
                ':disabled': {
                    color: colors?.grey400,
                    cursor: 'not-allowed',
                    ':hover': { background: 'none' },
                },
            }}
            {...props}
        >
            <IconComponent css={{ fill: 'currentcolor' }} />
            {children}
        </button>
    );
};
