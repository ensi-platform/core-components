import { IconSmallClosed as CloseIcon, scale } from '@ensi-platform/core-components-common';

import { type FC } from 'react';

import type { IRightAddonsProps } from './types';

export const RightAddons: FC<IRightAddonsProps> = ({ rightAddons, clear, onClear }) => (
    <>
        {clear && (
            <div
                css={{
                    height: '100%',
                    marginRight: rightAddons ? scale(1) : 0,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <button
                    type="button"
                    aria-label="Очистить"
                    css={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0,
                    }}
                    onClick={onClear}
                >
                    <CloseIcon />
                </button>
            </div>
        )}
        {rightAddons}
    </>
);
