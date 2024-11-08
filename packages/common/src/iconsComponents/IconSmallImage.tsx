import { SVGProps } from 'react';

export const IconSmallImage = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.33333 2.5C2.8731 2.5 2.5 2.8731 2.5 3.33333V12.6667C2.5 13.0629 2.77652 13.3945 3.14711 13.4791L10.3132 6.31307C10.5084 6.11781 10.825 6.11781 11.0203 6.31307L13.5 8.79281V3.33333C13.5 2.8731 13.1269 2.5 12.6667 2.5H3.33333ZM14.5 9.99352V3.33333C14.5 2.32081 13.6792 1.5 12.6667 1.5H3.33333C2.32081 1.5 1.5 2.32081 1.5 3.33333V12.6667C1.5 13.6792 2.32081 14.5 3.33333 14.5H12.6667C13.6792 14.5 14.5 13.6792 14.5 12.6667V10.0064C14.5001 10.0021 14.5001 9.99781 14.5 9.99352ZM13.5 10.207L10.6667 7.37373L4.54044 13.5H12.6667C13.1269 13.5 13.5 13.1269 13.5 12.6667V10.207ZM5.66663 5.16663C5.39048 5.16663 5.16663 5.39048 5.16663 5.66663C5.16663 5.94277 5.39048 6.16663 5.66663 6.16663C5.94277 6.16663 6.16663 5.94277 6.16663 5.66663C6.16663 5.39048 5.94277 5.16663 5.66663 5.16663ZM4.16663 5.66663C4.16663 4.8382 4.8382 4.16663 5.66663 4.16663C6.49505 4.16663 7.16663 4.8382 7.16663 5.66663C7.16663 6.49505 6.49505 7.16663 5.66663 7.16663C4.8382 7.16663 4.16663 6.49505 4.16663 5.66663Z"
        />
    </svg>
);
