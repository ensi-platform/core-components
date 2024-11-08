import { type SVGProps } from 'react';

export const IconSmallChart = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 2.16675C8.27614 2.16675 8.5 2.39061 8.5 2.66675V13.3334C8.5 13.6096 8.27614 13.8334 8 13.8334C7.72386 13.8334 7.5 13.6096 7.5 13.3334V2.66675C7.5 2.39061 7.72386 2.16675 8 2.16675ZM12 6.16675C12.2761 6.16675 12.5 6.39061 12.5 6.66675V13.3334C12.5 13.6096 12.2761 13.8334 12 13.8334C11.7239 13.8334 11.5 13.6096 11.5 13.3334V6.66675C11.5 6.39061 11.7239 6.16675 12 6.16675ZM4.5 9.3335C4.5 9.05735 4.27614 8.8335 4 8.8335C3.72386 8.8335 3.5 9.05735 3.5 9.3335V13.3335C3.5 13.6096 3.72386 13.8335 4 13.8335C4.27614 13.8335 4.5 13.6096 4.5 13.3335V9.3335Z"
        />
    </svg>
);
