import { SVGProps } from "react";

export const IconSmallLogOut = ({ title, ...props}: SVGProps<SVGSVGElement> & { title?: string }) => <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>{title && <title>{title}</title>}<path fillRule="evenodd" clipRule="evenodd" d="M3.33333 2.5C3.11232 2.5 2.90036 2.5878 2.74408 2.74408C2.5878 2.90036 2.5 3.11232 2.5 3.33333V12.6667C2.5 12.8877 2.5878 13.0996 2.74408 13.2559C2.90036 13.4122 3.11232 13.5 3.33333 13.5H6C6.27614 13.5 6.5 13.7239 6.5 14C6.5 14.2761 6.27614 14.5 6 14.5H3.33333C2.8471 14.5 2.38079 14.3068 2.03697 13.963C1.69315 13.6192 1.5 13.1529 1.5 12.6667V3.33333C1.5 2.8471 1.69315 2.38079 2.03697 2.03697C2.38079 1.69315 2.8471 1.5 3.33333 1.5H6C6.27614 1.5 6.5 1.72386 6.5 2C6.5 2.27614 6.27614 2.5 6 2.5H3.33333ZM10.3131 4.31307C10.5084 4.11781 10.825 4.11781 11.0202 4.31307L14.3536 7.64641C14.4122 7.70507 14.4533 7.77469 14.4767 7.84868C14.4867 7.88036 14.4937 7.9134 14.4973 7.94747C14.5058 8.02831 14.4946 8.11082 14.4638 8.18725C14.4434 8.23779 14.4144 8.28567 14.3768 8.32865C14.3685 8.33818 14.3598 8.34738 14.3508 8.35625L11.0202 11.6868C10.825 11.8821 10.5084 11.8821 10.3131 11.6868C10.1179 11.4916 10.1179 11.175 10.3131 10.9797L12.7929 8.5H6C5.72386 8.5 5.5 8.27614 5.5 8C5.5 7.72386 5.72386 7.5 6 7.5H12.793L10.3131 5.02018C10.1179 4.82492 10.1179 4.50833 10.3131 4.31307Z" /></svg>;
