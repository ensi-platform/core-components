import type { SVGProps } from 'react';

export const IconArrowDown = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={8} viewBox="0 0 14 8" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.707.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6A1 1 0 011.707.293L7 5.586 12.293.293a1 1 0 011.414 0z"
        />
    </svg>
);
