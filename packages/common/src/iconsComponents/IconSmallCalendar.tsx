import { type SVGProps } from 'react';

export const IconSmallCalendar = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.5 0.25C4.77614 0.25 5 0.473858 5 0.75V2.25H11V0.75C11 0.473858 11.2239 0.25 11.5 0.25C11.7761 0.25 12 0.473858 12 0.75V2.25H13C14.1046 2.25 15 3.14543 15 4.25V6.25V7.25V13.25C15 14.3546 14.1046 15.25 13 15.25H3C1.89543 15.25 1 14.3546 1 13.25V7.25V6.25V4.25C1 3.14543 1.89543 2.25 3 2.25H4L4 0.75C4 0.473858 4.22386 0.25 4.5 0.25ZM11 3.25V3.75C11 4.02614 11.2239 4.25 11.5 4.25C11.7761 4.25 12 4.02614 12 3.75V3.25H13C13.5523 3.25 14 3.69772 14 4.25V6.25H2V4.25C2 3.69772 2.44772 3.25 3 3.25H4V3.75C4 4.02614 4.22386 4.25 4.5 4.25C4.77614 4.25 5 4.02614 5 3.75V3.25H11ZM14 7.25V13.25C14 13.8023 13.5523 14.25 13 14.25H3C2.44772 14.25 2 13.8023 2 13.25V7.25H14Z"
        />
    </svg>
);
