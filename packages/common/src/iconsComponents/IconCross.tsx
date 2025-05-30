import type { SVGProps } from 'react';

export const IconCross = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            d="M.636 11.947l4.95-4.949-4.95-4.949L2.05.634 7 5.584l4.95-4.95 1.414 1.415-4.95 4.949 4.95 4.949-1.414 1.415L7 8.412l-4.95 4.95-1.414-1.415z"
        />
    </svg>
);
