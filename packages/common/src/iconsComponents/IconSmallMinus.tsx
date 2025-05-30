import type { SVGProps } from 'react';

export const IconSmallMinus = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.83331 8C2.83331 7.72386 3.05717 7.5 3.33331 7.5H12.6666C12.9428 7.5 13.1666 7.72386 13.1666 8C13.1666 8.27614 12.9428 8.5 12.6666 8.5H3.33331C3.05717 8.5 2.83331 8.27614 2.83331 8Z"
        />
    </svg>
);
