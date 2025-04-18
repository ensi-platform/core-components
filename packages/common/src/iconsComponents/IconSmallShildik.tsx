import type { SVGProps } from 'react';

export const IconSmallShildik = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            d="M7.67365 10.3135L3.5 13.9093V3C3.5 2.17157 4.17157 1.5 5 1.5H11C11.8284 1.5 12.5 2.17157 12.5 3V13.9093L8.32635 10.3135L8 10.0323L7.67365 10.3135Z"
            stroke="#787F85"
        />
    </svg>
);
