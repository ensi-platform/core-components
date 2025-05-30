import type { SVGProps } from 'react';

export const IconSmallExport = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.00002 10.5C8.12056 10.5 8.23113 10.4573 8.31747 10.3863L8.00002 10.5ZM8.31747 10.3863C8.32998 10.376 8.34203 10.3651 8.35357 10.3536L11.6869 7.02022C11.8822 6.82496 11.8822 6.50838 11.6869 6.31311C11.4916 6.11785 11.1751 6.11785 10.9798 6.31311L8.5 8.79291V2C8.5 1.72386 8.27614 1.5 8 1.5C7.72386 1.5 7.5 1.72386 7.5 2V8.79287L5.02024 6.31311C4.82498 6.11785 4.5084 6.11785 4.31313 6.31311C4.11787 6.50838 4.11787 6.82496 4.31313 7.02022L7.64381 10.3509C7.73449 10.4429 7.86058 10.5 8 10.5C8 10.5 8.00001 10.5 8.00001 10.5M2 9.5C2.27614 9.5 2.5 9.72386 2.5 10V12.6667C2.5 12.8877 2.5878 13.0996 2.74408 13.2559C2.90036 13.4122 3.11232 13.5 3.33333 13.5H12.6667C12.8877 13.5 13.0996 13.4122 13.2559 13.2559C13.4122 13.0996 13.5 12.8877 13.5 12.6667V10C13.5 9.72386 13.7239 9.5 14 9.5C14.2761 9.5 14.5 9.72386 14.5 10V12.6667C14.5 13.1529 14.3068 13.6192 13.963 13.963C13.6192 14.3068 13.1529 14.5 12.6667 14.5H3.33333C2.8471 14.5 2.38079 14.3068 2.03697 13.963C1.69315 13.6192 1.5 13.1529 1.5 12.6667V10C1.5 9.72386 1.72386 9.5 2 9.5Z"
        />
    </svg>
);
