import { ReactNode, useCallback, useMemo } from 'react';

import { useLinkCSS, formatDate, DateFormaters } from '@greensight/core-components-common';

import { InfoListItemCommonType } from '../types';

export const useGetInfoItemValue = (props: InfoListItemCommonType) => {
    const linkStyles = useLinkCSS();

    const renderSimpleLink = useCallback(
        ({ href, children }: { href: string; children: ReactNode | ReactNode[] }) => (
            <a css={linkStyles} href={href}>
                {children}
            </a>
        ),
        []
    );

    return useMemo(() => {
        switch (props.type) {
            case 'boolean':
                return props.value ? 'да' : 'нет';
            case 'date':
                return props.value ? formatDate(new Date(props.value), DateFormaters.DATE_AND_TIME) : '-';
            case 'link':
                return (props.renderLink || renderSimpleLink)({
                    href: props.link,
                    children: props.value,
                });
            default:
                return props.value || '-';
        }
    }, [linkStyles, props]);
};
