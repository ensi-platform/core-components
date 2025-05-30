import type { SVGProps } from 'react';

export const IconSmallArrowRight = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.99075 4.46461L12.1727 7.6466C12.368 7.84186 12.368 8.15844 12.1727 8.3537L8.99075 11.5357C8.79548 11.7309 8.4789 11.7309 8.28364 11.5357C8.08838 11.3404 8.08838 11.0238 8.28364 10.8286L10.6121 8.50015L3.81714 8.50015C3.541 8.50015 3.31714 8.27629 3.31714 8.00015C3.31714 7.72401 3.541 7.50015 3.81714 7.50015L10.6121 7.50015L8.28364 5.17172C8.08838 4.97646 8.08838 4.65988 8.28364 4.46461C8.4789 4.26935 8.79548 4.26935 8.99075 4.46461Z"
        />
    </svg>
);
