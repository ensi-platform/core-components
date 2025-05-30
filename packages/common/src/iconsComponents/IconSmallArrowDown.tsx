import type { SVGProps } from 'react';

export const IconSmallArrowDown = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.3536 9.17263L8.17164 12.3546C7.97638 12.5499 7.6598 12.5499 7.46454 12.3546L4.28256 9.17263C4.08729 8.97737 4.08729 8.66079 4.28256 8.46552C4.47782 8.27026 4.7944 8.27026 4.98966 8.46552L7.31809 10.794L7.31809 3.99902C7.31809 3.72288 7.54195 3.49902 7.81809 3.49902C8.09423 3.49902 8.31809 3.72288 8.31809 3.99902L8.31809 10.794L10.6465 8.46552C10.8418 8.27026 11.1584 8.27026 11.3536 8.46552C11.5489 8.66079 11.5489 8.97737 11.3536 9.17263Z"
        />
    </svg>
);
