import type { SVGProps } from 'react';

export const IconSmallRouble = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 3C4 2.72386 4.22386 2.5 4.5 2.5H9C10.933 2.5 12.5 4.067 12.5 6C12.5 7.933 10.933 9.5 9 9.5H7H5V10.5H10C10.2761 10.5 10.5 10.7239 10.5 11C10.5 11.2761 10.2761 11.5 10 11.5H5V13.5C5 13.7761 4.77614 14 4.5 14C4.22386 14 4 13.7761 4 13.5L4 11.5H3C2.72386 11.5 2.5 11.2761 2.5 11C2.5 10.7239 2.72386 10.5 3 10.5H4L4 9.5H3C2.72386 9.5 2.5 9.27614 2.5 9C2.5 8.72386 2.72386 8.5 3 8.5H4V3.5V3ZM5 8.5H7H9C10.3807 8.5 11.5 7.38071 11.5 6C11.5 4.61929 10.3807 3.5 9 3.5H5V8.5Z"
        />
    </svg>
);
