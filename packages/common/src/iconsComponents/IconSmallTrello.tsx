import { SVGProps } from 'react';

export const IconSmallTrello = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.33333 2.33325C2.8731 2.33325 2.5 2.70635 2.5 3.16659V12.4999C2.5 12.9602 2.8731 13.3333 3.33333 13.3333H12.6667C13.1269 13.3333 13.5 12.9602 13.5 12.4999V3.16659C13.5 2.70635 13.1269 2.33325 12.6667 2.33325H3.33333ZM1.5 3.16659C1.5 2.15406 2.32081 1.33325 3.33333 1.33325H12.6667C13.6792 1.33325 14.5 2.15406 14.5 3.16659V12.4999C14.5 13.5124 13.6792 14.3333 12.6667 14.3333H3.33333C2.32081 14.3333 1.5 13.5124 1.5 12.4999V3.16659ZM4.16663 4.66663C4.16663 4.39048 4.39048 4.16663 4.66663 4.16663H6.66663C6.94277 4.16663 7.16663 4.39048 7.16663 4.66663V10.6666C7.16663 10.9428 6.94277 11.1666 6.66663 11.1666H4.66663C4.39048 11.1666 4.16663 10.9428 4.16663 10.6666V4.66663ZM5.16663 5.16663V10.1666H6.16663V5.16663H5.16663ZM9.33337 4.16663C9.05723 4.16663 8.83337 4.39048 8.83337 4.66663V7.99996C8.83337 8.2761 9.05723 8.49996 9.33337 8.49996H11.3334C11.6095 8.49996 11.8334 8.2761 11.8334 7.99996V4.66663C11.8334 4.39048 11.6095 4.16663 11.3334 4.16663H9.33337ZM9.83337 7.49996V5.16663H10.8334V7.49996H9.83337Z"
        />
    </svg>
);
