import type { SVGProps } from 'react';

export const IconSmallPromocode = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 4H15V13H1V4ZM0 4C0 3.44771 0.447715 3 1 3H15C15.5523 3 16 3.44772 16 4V13C16 13.5523 15.5523 14 15 14H1C0.447715 14 0 13.5523 0 13V4ZM4.50001 5.00001C4.70361 5.00001 4.88688 5.12346 4.96338 5.31215L6.46105 9.00636L6.58899 9.30065L7.45855 11.3006C7.56865 11.5539 7.45261 11.8484 7.19937 11.9585C6.94613 12.0686 6.65158 11.9526 6.54147 11.6994L5.80263 10H3.19741L2.45854 11.6994C2.34844 11.9526 2.05389 12.0686 1.80065 11.9585C1.5474 11.8484 1.43137 11.5539 1.54148 11.3006L2.41106 9.30064L2.539 9.00637L4.03664 5.31216C4.11313 5.12347 4.2964 5.00001 4.50001 5.00001ZM3.62063 9.00001H5.37942L4.50002 6.83084L3.62063 9.00001ZM8 5.50001C8 5.22386 8.22386 5.00001 8.5 5.00001H9.5H10.5C10.7761 5.00001 11 5.22386 11 5.50001C11 5.77615 10.7761 6.00001 10.5 6.00001H10V11H10.5C10.7761 11 11 11.2239 11 11.5C11 11.7761 10.7761 12 10.5 12H9.5H8.5C8.22386 12 8 11.7761 8 11.5C8 11.2239 8.22386 11 8.5 11H9V6.00001H8.5C8.22386 6.00001 8 5.77615 8 5.50001Z"
        />
    </svg>
);
