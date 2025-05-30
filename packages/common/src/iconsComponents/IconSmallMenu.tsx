import type { SVGProps } from 'react';

export const IconSmallMenu = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.5 4C1.5 3.72386 1.72386 3.5 2 3.5H14C14.2761 3.5 14.5 3.72386 14.5 4C14.5 4.27614 14.2761 4.5 14 4.5H2C1.72386 4.5 1.5 4.27614 1.5 4ZM1.5 8C1.5 7.72386 1.72386 7.5 2 7.5H14C14.2761 7.5 14.5 7.72386 14.5 8C14.5 8.27614 14.2761 8.5 14 8.5H2C1.72386 8.5 1.5 8.27614 1.5 8ZM2 11.5C1.72386 11.5 1.5 11.7239 1.5 12C1.5 12.2761 1.72386 12.5 2 12.5H14C14.2761 12.5 14.5 12.2761 14.5 12C14.5 11.7239 14.2761 11.5 14 11.5H2Z"
        />
    </svg>
);
