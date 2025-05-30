import type { SVGProps } from 'react';

export const IconSmallDash = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.00003 8.5C5.00003 8.22386 5.22389 8 5.50003 8H10.5C10.7762 8 11 8.22386 11 8.5C11 8.77614 10.7762 9 10.5 9H5.50003C5.22389 9 5.00003 8.77614 5.00003 8.5Z"
        />
    </svg>
);
