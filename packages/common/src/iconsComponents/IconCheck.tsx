import type { SVGProps } from 'react';

export const IconCheck = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={9} viewBox="0 0 14 9" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            d="M5.695 8.997a.96.96 0 01-.686-.292L.839 4.41l1.374-1.413 3.482 3.586 6.828-6.586 1.374 1.414-7.515 7.294a.963.963 0 01-.687.292z"
        />
    </svg>
);
