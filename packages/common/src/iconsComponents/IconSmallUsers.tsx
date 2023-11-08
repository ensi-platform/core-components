import { SVGProps } from "react";

export const IconSmallUsers = ({ title, ...props}: SVGProps<SVGSVGElement> & { title?: string }) => <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>{title && <title>{title}</title>}<path fillRule="evenodd" clipRule="evenodd" d="M5.99996 2.5C4.80334 2.5 3.83329 3.47005 3.83329 4.66667C3.83329 5.86328 4.80334 6.83333 5.99996 6.83333C7.19658 6.83333 8.16663 5.86328 8.16663 4.66667C8.16663 3.47005 7.19658 2.5 5.99996 2.5ZM2.83329 4.66667C2.83329 2.91776 4.25106 1.5 5.99996 1.5C7.74886 1.5 9.16663 2.91776 9.16663 4.66667C9.16663 6.41557 7.74886 7.83333 5.99996 7.83333C4.25106 7.83333 2.83329 6.41557 2.83329 4.66667ZM10.1823 1.96265C10.2507 1.69513 10.5231 1.5338 10.7906 1.60229C11.4718 1.7767 12.0756 2.17285 12.5067 2.72829C12.9378 3.28373 13.1719 3.96687 13.1719 4.67C13.1719 5.37314 12.9378 6.05627 12.5067 6.61171C12.0756 7.16715 11.4718 7.5633 10.7906 7.73771C10.5231 7.8062 10.2507 7.64487 10.1823 7.37735C10.1138 7.10984 10.2751 6.83745 10.5426 6.76896C11.0087 6.64963 11.4218 6.37858 11.7167 5.99854C12.0117 5.6185 12.1719 5.15109 12.1719 4.67C12.1719 4.18891 12.0117 3.7215 11.7167 3.34146C11.4218 2.96142 11.0087 2.69037 10.5426 2.57104C10.2751 2.50255 10.1138 2.23016 10.1823 1.96265ZM1.09412 10.4275C1.68799 9.83363 2.49344 9.5 3.33329 9.5H8.66663C9.50648 9.5 10.3119 9.83363 10.9058 10.4275C11.4997 11.0214 11.8333 11.8268 11.8333 12.6667V14C11.8333 14.2761 11.6094 14.5 11.3333 14.5C11.0572 14.5 10.8333 14.2761 10.8333 14V12.6667C10.8333 12.092 10.605 11.5409 10.1987 11.1346C9.79236 10.7283 9.24126 10.5 8.66663 10.5H3.33329C2.75866 10.5 2.20756 10.7283 1.80123 11.1346C1.3949 11.5409 1.16663 12.092 1.16663 12.6667V14C1.16663 14.2761 0.942768 14.5 0.666626 14.5C0.390484 14.5 0.166626 14.2761 0.166626 14V12.6667C0.166626 11.8268 0.500256 11.0214 1.09412 10.4275ZM12.8492 9.96167C12.9182 9.69429 13.1909 9.53351 13.4583 9.60254C14.1376 9.77795 14.7395 10.174 15.1694 10.7285C15.5992 11.2831 15.8328 11.9647 15.8333 12.6663V12.6667V14C15.8333 14.2761 15.6094 14.5 15.3333 14.5C15.0572 14.5 14.8333 14.2761 14.8333 14V12.667C14.8329 12.187 14.6732 11.7206 14.379 11.3412C14.0849 10.9618 13.6731 10.6908 13.2083 10.5708C12.9409 10.5018 12.7801 10.229 12.8492 9.96167Z" /></svg>;
