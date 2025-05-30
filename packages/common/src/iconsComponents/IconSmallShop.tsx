import type { SVGProps } from 'react';

export const IconSmallShop = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 2H2V14H5V8V7H6H10H11V8V14H14V2ZM10 14H6V8H10V14ZM2 15H5H6H10H11H14C14.5523 15 15 14.5523 15 14V2C15 1.44772 14.5523 1 14 1H2C1.44772 1 1 1.44772 1 2V14C1 14.5523 1.44772 15 2 15ZM5.5 4C5.22386 4 5 4.22386 5 4.5C5 4.77614 5.22386 5 5.5 5H10.5C10.7761 5 11 4.77614 11 4.5C11 4.22386 10.7761 4 10.5 4H5.5Z"
        />
    </svg>
);
