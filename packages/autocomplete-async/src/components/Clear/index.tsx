import { IconSmallClosed as CloseIcon, scale } from '@ensi-platform/core-components-common';

export const Clear = ({
    clear,
    focus,
    visible,
    className,
}: {
    clear: () => void;
    focus: () => void;
    visible: boolean;
    className?: string;
}) =>
    visible ? (
        <button
            type="button"
            className={className}
            onClick={e => {
                e.stopPropagation();
                clear();

                setTimeout(() => {
                    focus();
                }, 0);
            }}
            css={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                height: '100%',
                margin: `0 ${scale(1, true)}px`,
            }}
        >
            <CloseIcon />
        </button>
    ) : null;
