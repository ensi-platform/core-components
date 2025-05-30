import type { SVGProps } from 'react';

export const IconCalendar = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 14 14" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            d="M13 1.999h-2V-.002h-1v2.001H4V-.002H3v2.001H1a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-10a1 1 0 00-1-1zm0 11H1v-7h12v7zm0-8H1v-2h12v2z"
        />
    </svg>
);
