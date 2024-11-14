import type { SVGProps } from 'react';

export const IconSmallBundle = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.83333 2C2.61232 2 2.40036 2.0878 2.24408 2.24408C2.0878 2.40036 2 2.61232 2 2.83333V8.66672C2 8.88773 2.0878 9.09969 2.24408 9.25597C2.40036 9.41225 2.61232 9.50005 2.83333 9.50005H3.5C3.77614 9.50005 4 9.72391 4 10.0001C4 10.2762 3.77614 10.5001 3.5 10.5001H2.83333C2.3471 10.5001 1.88079 10.3069 1.53697 9.96308C1.19315 9.61926 1 9.15295 1 8.66672V2.83333C1 2.3471 1.19315 1.88079 1.53697 1.53697C1.88079 1.19315 2.3471 1 2.83333 1H8.66669C9.15292 1 9.61923 1.19315 9.96305 1.53697C10.3069 1.88079 10.5 2.3471 10.5 2.83333V3.5C10.5 3.77614 10.2762 4 10 4C9.72388 4 9.50002 3.77614 9.50002 3.5V2.83333C9.50002 2.61232 9.41222 2.40036 9.25594 2.24408C9.09966 2.0878 8.8877 2 8.66669 2H2.83333ZM10.6923 6.00001C10.6923 5.72387 10.9161 5.50001 11.1923 5.50001H13.1154C14.1562 5.50001 15 6.34378 15 7.38463V13.1154C15 14.1562 14.1562 15 13.1154 15H7.3846C6.34375 15 5.49998 14.1562 5.49998 13.1154V11.1923C5.49998 10.9162 5.72384 10.6923 5.99998 10.6923C6.27612 10.6923 6.49998 10.9162 6.49998 11.1923V13.1154C6.49998 13.604 6.89604 14 7.3846 14H13.1154C13.6039 14 14 13.604 14 13.1154V7.38463C14 6.89607 13.6039 6.50001 13.1154 6.50001H11.1923C10.9161 6.50001 10.6923 6.27615 10.6923 6.00001ZM7.99998 5.50001C7.99998 5.22387 7.77612 5.00001 7.49998 5.00001C7.22384 5.00001 6.99998 5.22387 6.99998 5.50001V7.00001H5.49998C5.22384 7.00001 4.99998 7.22387 4.99998 7.50001C4.99998 7.77615 5.22384 8.00001 5.49998 8.00001H6.99998V9.50001C6.99998 9.77615 7.22384 10 7.49998 10C7.77612 10 7.99998 9.77615 7.99998 9.50001V8.00001H9.49998C9.77612 8.00001 9.99998 7.77615 9.99998 7.50001C9.99998 7.22387 9.77612 7.00001 9.49998 7.00001H7.99998V5.50001Z"
        />
    </svg>
);
