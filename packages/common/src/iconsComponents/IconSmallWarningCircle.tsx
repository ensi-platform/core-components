import { type SVGProps } from 'react';

export const IconSmallWarningCircle = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.99998 2.1001C4.7415 2.1001 2.09998 4.74162 2.09998 8.0001C2.09998 11.2586 4.7415 13.9001 7.99997 13.9001C11.2585 13.9001 13.9 11.2586 13.9 8.0001C13.9 4.74162 11.2585 2.1001 7.99998 2.1001ZM1.09998 8.0001C1.09998 4.18933 4.18921 1.1001 7.99998 1.1001C11.8107 1.1001 14.9 4.18933 14.9 8.0001C14.9 11.8109 11.8107 14.9001 7.99997 14.9001C4.18921 14.9001 1.09998 11.8109 1.09998 8.0001ZM7.99998 4.30009C8.27612 4.30009 8.49998 4.52395 8.49998 4.80009L7.99998 4.80009H7.49998C7.49998 4.52395 7.72384 4.30009 7.99998 4.30009ZM7.99998 4.80009L8.49998 4.80013V4.80022V4.80059V4.80208V4.80797V4.83103V4.91932V5.24102V6.2759V8.40009C8.49998 8.67624 8.27612 8.90009 7.99998 8.90009C7.72384 8.90009 7.49998 8.67624 7.49998 8.40009L7.49998 6.2759V5.24102V4.91932V4.83103V4.80797V4.80208V4.80059V4.80022V4.80013L7.99998 4.80009ZM7.99997 12.0001C8.4418 12.0001 8.79997 11.6419 8.79997 11.2001C8.79997 10.7583 8.4418 10.4001 7.99997 10.4001C7.55815 10.4001 7.19997 10.7583 7.19997 11.2001C7.19997 11.6419 7.55815 12.0001 7.99997 12.0001Z"
        />
    </svg>
);
