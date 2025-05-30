import type { SVGProps } from 'react';

export const IconError = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" {...props}>
        {title && <title>{title}</title>}
        <path d="M11 22C4.9 22 0 17.1 0 11S4.9 0 11 0s11 4.9 11 11-4.9 11-11 11zm0-20c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9z" />
        <path d="M11 12c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1zM11 16c-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7 0-.1 0-.3.1-.4.1-.1.1-.2.2-.3.3-.3.7-.4 1.1-.2.1 0 .1 0 .2.1 0 0 .1.1.2.1.1.1.2.2.2.3v.4c0 .1 0 .3-.1.4-.1.1-.1.2-.2.3-.2.2-.4.3-.7.3z" />
    </svg>
);
