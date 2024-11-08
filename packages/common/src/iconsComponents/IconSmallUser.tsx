import { SVGProps } from 'react';

export const IconSmallUser = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.99996 2.5C6.80334 2.5 5.83329 3.47005 5.83329 4.66667C5.83329 5.86328 6.80334 6.83333 7.99996 6.83333C9.19658 6.83333 10.1666 5.86328 10.1666 4.66667C10.1666 3.47005 9.19658 2.5 7.99996 2.5ZM4.83329 4.66667C4.83329 2.91776 6.25106 1.5 7.99996 1.5C9.74886 1.5 11.1666 2.91776 11.1666 4.66667C11.1666 6.41557 9.74886 7.83333 7.99996 7.83333C6.25106 7.83333 4.83329 6.41557 4.83329 4.66667ZM3.09412 10.4275C3.68799 9.83363 4.49344 9.5 5.33329 9.5H10.6666C11.5065 9.5 12.3119 9.83363 12.9058 10.4275C13.4997 11.0214 13.8333 11.8268 13.8333 12.6667V14C13.8333 14.2761 13.6094 14.5 13.3333 14.5C13.0572 14.5 12.8333 14.2761 12.8333 14V12.6667C12.8333 12.092 12.605 11.5409 12.1987 11.1346C11.7924 10.7283 11.2413 10.5 10.6666 10.5H5.33329C4.75866 10.5 4.20756 10.7283 3.80123 11.1346C3.3949 11.5409 3.16663 12.092 3.16663 12.6667V14C3.16663 14.2761 2.94277 14.5 2.66663 14.5C2.39048 14.5 2.16663 14.2761 2.16663 14V12.6667C2.16663 11.8268 2.50026 11.0214 3.09412 10.4275Z"
        />
    </svg>
);
