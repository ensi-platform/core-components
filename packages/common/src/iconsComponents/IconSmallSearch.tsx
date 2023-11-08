import { SVGProps } from "react";

export const IconSmallSearch = ({ title, ...props}: SVGProps<SVGSVGElement> & { title?: string }) => <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>{title && <title>{title}</title>}<path fillRule="evenodd" clipRule="evenodd" d="M2.5 7.33333C2.5 4.66396 4.66396 2.5 7.33333 2.5C10.0027 2.5 12.1667 4.66396 12.1667 7.33333C12.1667 8.64042 11.6478 9.82632 10.8049 10.6963C10.7844 10.7113 10.7649 10.728 10.7464 10.7465C10.728 10.7649 10.7113 10.7844 10.6963 10.8049C9.82631 11.6478 8.64041 12.1667 7.33333 12.1667C4.66396 12.1667 2.5 10.0027 2.5 7.33333ZM11.0895 11.7966C10.0746 12.6515 8.76415 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333C13.1667 8.76415 12.6515 10.0747 11.7966 11.0895L14.3536 13.6465C14.5488 13.8417 14.5488 14.1583 14.3536 14.3536C14.1583 14.5488 13.8417 14.5488 13.6464 14.3536L11.0895 11.7966Z" /></svg>;
