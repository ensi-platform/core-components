import type { SVGProps } from 'react';

export const IconSmallArrowLeft = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.64561 11.5356L3.46363 8.35365C3.26836 8.15839 3.26836 7.8418 3.46363 7.64654L6.64561 4.46456C6.84087 4.2693 7.15745 4.2693 7.35271 4.46456C7.54798 4.65982 7.54798 4.97641 7.35271 5.17167L5.02429 7.5001L11.8192 7.5001C12.0954 7.5001 12.3192 7.72395 12.3192 8.0001C12.3192 8.27624 12.0954 8.5001 11.8192 8.5001L5.02429 8.5001L7.35271 10.8285C7.54797 11.0238 7.54797 11.3404 7.35271 11.5356C7.15745 11.7309 6.84087 11.7309 6.64561 11.5356Z"
        />
    </svg>
);
