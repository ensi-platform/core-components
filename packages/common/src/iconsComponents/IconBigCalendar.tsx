import type { SVGProps } from 'react';

export const IconBigCalendar = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={48} height={48} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.7 8C17.2523 8 17.7 8.44772 17.7 9V12.3H31.1V9C31.1 8.44772 31.5477 8 32.1 8C32.6523 8 33.1 8.44772 33.1 9V12.3H37.8C38.9046 12.3 39.8 13.1954 39.8 14.3L39.8 21.3V23.3L39.8 38.9C39.8 40.0046 38.9046 40.9 37.8 40.9H11C9.89543 40.9 9 40.0046 9 38.9V23.3V21.3V14.3C9 13.1954 9.89543 12.3 11 12.3H15.7L15.7 9C15.7 8.44772 16.1477 8 16.7 8ZM31.1 14.3V15.6C31.1 16.1523 31.5477 16.6 32.1 16.6C32.6523 16.6 33.1 16.1523 33.1 15.6V14.3H37.8V21.3H11V14.3H15.7V15.6C15.7 16.1523 16.1477 16.6 16.7 16.6C17.2523 16.6 17.7 16.1523 17.7 15.6V14.3H31.1ZM37.8 23.3L37.8 38.9L11 38.9V23.3H37.8Z"
        />
    </svg>
);
