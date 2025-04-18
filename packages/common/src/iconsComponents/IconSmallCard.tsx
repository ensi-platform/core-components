import type { SVGProps } from 'react';

export const IconSmallCard = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 4H1V6H15V4ZM0 4V6.5V13C0 13.5523 0.447715 14 1 14H15C15.5523 14 16 13.5523 16 13V6.5V4C16 3.44772 15.5523 3 15 3H1C0.447715 3 0 3.44771 0 4ZM1 13H15V7H1V13ZM11 10C10.7239 10 10.5 10.2239 10.5 10.5C10.5 10.7761 10.7239 11 11 11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H11Z"
        />
    </svg>
);
