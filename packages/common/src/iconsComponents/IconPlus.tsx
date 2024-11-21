import type { SVGProps } from 'react';

export const IconPlus = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
        {title && <title>{title}</title>}
        <path fillRule="evenodd" d="M12 4a1 1 0 011 1v14a1 1 0 11-2 0V5a1 1 0 011-1z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M4 12a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);
