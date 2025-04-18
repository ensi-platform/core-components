import type { SVGProps } from 'react';

export const IconSmallCheck = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.717 4.63617C13.102 5.03216 13.0931 5.66526 12.6971 6.05025L7.55422 11.0502C7.1661 11.4276 6.54819 11.4276 6.16006 11.0502L3.30292 8.27247C2.90694 7.88748 2.89802 7.25438 3.28301 6.8584C3.66799 6.46241 4.30109 6.45349 4.69708 6.83848L6.85714 8.93854L11.3029 4.61626C11.6989 4.23127 12.332 4.24019 12.717 4.63617Z"
        />
    </svg>
);
