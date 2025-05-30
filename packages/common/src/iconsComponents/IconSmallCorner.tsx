import type { SVGProps } from 'react';

export const IconSmallCorner = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            d="M5.99996 6.66675L2.66663 10.0001L5.99996 13.3334"
            stroke="#787F85"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M13.3333 2.66675V7.33341C13.3333 8.04066 13.0523 8.71894 12.5522 9.21903C12.0521 9.71913 11.3739 10.0001 10.6666 10.0001H2.66663"
            stroke="#787F85"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
