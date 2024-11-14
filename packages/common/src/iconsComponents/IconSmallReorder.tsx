import type { SVGProps } from 'react';

export const IconSmallReorder = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <g clipPath="url(#clip0)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 2C5.23858 2 2.94601 4.01026 2.50496 6.64844L3.00359 6.14953C3.1988 5.95421 3.51538 5.95412 3.7107 6.14933C3.90601 6.34454 3.9061 6.66112 3.7109 6.85644L2.28227 8.28586C2.1885 8.37969 2.06128 8.43241 1.92862 8.43241C1.79596 8.43241 1.66874 8.37969 1.57497 8.28586L0.146347 6.85644C-0.0488601 6.66112 -0.048771 6.34454 0.146546 6.14933C0.341863 5.95412 0.658446 5.95421 0.853653 6.14953L1.47676 6.77299C1.87218 3.5202 4.64173 1 8 1C10.5122 1 12.6943 2.41055 13.7997 4.48068C13.9298 4.72427 13.8378 5.02718 13.5942 5.15726C13.3506 5.28734 13.0477 5.19532 12.9176 4.95174C11.979 3.19403 10.1284 2 8 2ZM14.5233 8.37684L15.1467 9.00058C15.3419 9.1959 15.6584 9.19599 15.8538 9.00078C16.0491 8.80557 16.0492 8.48899 15.854 8.29367L14.4253 6.86425C14.3316 6.77042 14.2043 6.7177 14.0717 6.7177C13.939 6.7177 13.8118 6.77042 13.718 6.86424L12.2894 8.29367C12.0942 8.48899 12.0943 8.80557 12.2896 9.00078C12.4849 9.19598 12.8015 9.1959 12.9967 9.00058L13.495 8.50204C13.0538 11.14 10.7613 13.1501 8 13.1501C5.8716 13.1501 4.021 11.9561 3.08236 10.1984C2.95229 9.9548 2.64937 9.86278 2.40578 9.99286C2.1622 10.1229 2.07018 10.4259 2.20026 10.6694C3.30574 12.7396 5.48777 14.1501 8 14.1501C11.3584 14.1501 14.128 11.6298 14.5233 8.37684Z"
            />
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width={16} height={16} />
            </clipPath>
        </defs>
    </svg>
);
