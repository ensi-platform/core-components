import type { SVGProps } from 'react';

export const IconArrowLeft = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={8} height={14} viewBox="0 0 8 14" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.707.293a1 1 0 010 1.414L2.414 7l5.293 5.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
        />
    </svg>
);
