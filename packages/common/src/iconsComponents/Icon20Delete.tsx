import type { SVGProps } from 'react';

export const Icon20Delete = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={20} height={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 10C3 6.13401 6.13401 3 10 3C11.6218 3 13.1148 3.55154 14.3016 4.47728L4.47728 14.3016C3.55154 13.1148 3 11.6218 3 10ZM5.91922 15.6881C7.06806 16.5138 8.47725 17 10 17C13.866 17 17 13.866 17 10C17 8.47725 16.5138 7.06806 15.6881 5.91922L5.91922 15.6881ZM10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1Z"
        />
    </svg>
);
