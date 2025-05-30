import type { SVGProps } from 'react';

export const IconSmallChevronUp = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.64645 10.3536C3.84171 10.5488 4.15829 10.5488 4.35355 10.3536L8 6.70711L11.6464 10.3536C11.8417 10.5488 12.1583 10.5488 12.3536 10.3536C12.5488 10.1583 12.5488 9.84171 12.3536 9.64645L8.35355 5.64645C8.15829 5.45118 7.84171 5.45118 7.64645 5.64645L3.64645 9.64645C3.45118 9.84171 3.45118 10.1583 3.64645 10.3536Z"
        />
    </svg>
);
