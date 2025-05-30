import type { SVGProps } from 'react';

export const IconSmallChevronLeft = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.3536 3.64645C10.1583 3.45118 9.84171 3.45118 9.64645 3.64645L5.64645 7.64645C5.55268 7.74022 5.5 7.86739 5.5 8C5.5 8.13261 5.55268 8.25979 5.64645 8.35355L9.64645 12.3536C9.84171 12.5488 10.1583 12.5488 10.3536 12.3536C10.5488 12.1583 10.5488 11.8417 10.3536 11.6464L6.70711 8L10.3536 4.35355C10.5488 4.15829 10.5488 3.84171 10.3536 3.64645Z"
        />
    </svg>
);
