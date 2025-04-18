import type { SVGProps } from 'react';

export const IconSmallWarehouse = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <g clipPath="url(#clip0)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.5 1.5H10.5V6.5H5.5V1.5H7.5V2.5H8.5V1.5ZM4.5 1.5C4.5 0.947715 4.94772 0.5 5.5 0.5H10.5C11.0523 0.5 11.5 0.947715 11.5 1.5V6.5C11.5 7.05228 11.0523 7.5 10.5 7.5H5.5C4.94772 7.5 4.5 7.05228 4.5 6.5V1.5ZM1.5 9.5H3.5V10.5H4.5V9.5H6.5V14.5H1.5L1.5 9.5ZM0.5 9.5C0.5 8.94771 0.947715 8.5 1.5 8.5H6.5C7.05228 8.5 7.5 8.94772 7.5 9.5V14.5C7.5 15.0523 7.05228 15.5 6.5 15.5H1.5C0.947715 15.5 0.5 15.0523 0.5 14.5V9.5ZM14.5 9.5H12.5V10.5H11.5V9.5H9.5V14.5H14.5V9.5ZM9.5 8.5C8.94772 8.5 8.5 8.94771 8.5 9.5V14.5C8.5 15.0523 8.94771 15.5 9.5 15.5H14.5C15.0523 15.5 15.5 15.0523 15.5 14.5V9.5C15.5 8.94772 15.0523 8.5 14.5 8.5H9.5Z"
            />
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width={16} height={16} />
            </clipPath>
        </defs>
    </svg>
);
