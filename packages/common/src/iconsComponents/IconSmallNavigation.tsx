import type { SVGProps } from 'react';

export const IconSmallNavigation = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.0202 0.979713C15.1696 1.12913 15.209 1.35634 15.1185 1.54731L9.11855 14.214C9.02814 14.4048 8.82757 14.5183 8.61741 14.4975C8.40725 14.4767 8.23283 14.3261 8.18161 14.1212L6.92104 9.07891L1.87874 7.81834C1.67386 7.76712 1.52326 7.59269 1.50245 7.38254C1.48164 7.17238 1.59511 6.9718 1.78597 6.8814L14.4526 0.881397C14.6436 0.79094 14.8708 0.830296 15.0202 0.979713ZM3.47669 7.18705L7.45461 8.18153C7.63376 8.22631 7.77363 8.36619 7.81842 8.54533L8.8129 12.5233L13.6155 2.38446L3.47669 7.18705Z"
        />
    </svg>
);
