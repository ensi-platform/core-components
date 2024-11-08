import { type SVGProps } from 'react';

export const IconBigCheckCircle = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={48} height={48} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 23.6913C9 15.5775 15.5775 9 23.6913 9C31.8051 9 38.3826 15.5775 38.3826 23.6913C38.3826 31.8051 31.8051 38.3826 23.6913 38.3826C15.5775 38.3826 9 31.8051 9 23.6913ZM23.6913 7C14.4729 7 7 14.4729 7 23.6913C7 32.9096 14.4729 40.3826 23.6913 40.3826C32.9096 40.3826 40.3826 32.9096 40.3826 23.6913C40.3826 14.4729 32.9096 7 23.6913 7ZM32.9071 19.5703C33.2976 19.1798 33.2976 18.5466 32.9071 18.1561C32.5165 17.7656 31.8834 17.7656 31.4929 18.1561L22.5438 27.1055L18.3632 22.925C17.9727 22.5345 17.3396 22.5345 16.949 22.925C16.5585 23.3155 16.5585 23.9487 16.949 24.3392L21.8367 29.2268C22.0242 29.4144 22.2786 29.5197 22.5438 29.5197C22.809 29.5197 23.0634 29.4144 23.2509 29.2268L32.9071 19.5703Z"
        />
    </svg>
);
