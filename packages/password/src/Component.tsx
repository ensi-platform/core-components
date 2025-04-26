'use client';

import { Component as Input } from '@ensi-platform/core-components-input';

import { type FC, useMemo, useState } from 'react';

import PasswordButton from './components/PasswordButton';
import type { IPasswordProps } from './types';

export const Component: FC<IPasswordProps> = ({ rightAddons, ...props }) => {
    const [visible, setVisible] = useState(false);

    const rightAddonsInner = useMemo(
        () => (
            <>
                <PasswordButton visible={visible} setVisible={setVisible} />
                {rightAddons}
            </>
        ),
        [rightAddons, visible]
    );
    return <Input {...props} type={visible ? 'text' : 'password'} spellCheck={false} rightAddons={rightAddonsInner} />;
};
