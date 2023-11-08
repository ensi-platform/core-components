import { SVGProps } from "react";

export const IconSmallBell = ({ title, ...props}: SVGProps<SVGSVGElement> & { title?: string }) => <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>{title && <title>{title}</title>}<path fillRule="evenodd" clipRule="evenodd" d="M8.00004 0.833252C6.80656 0.833252 5.66197 1.30736 4.81806 2.15127C3.97414 2.99519 3.50004 4.13978 3.50004 5.33325C3.50004 7.59292 3.01651 9.0089 2.56109 9.84383C2.33269 10.2626 2.10865 10.5402 1.94956 10.7081C1.86989 10.7922 1.80616 10.8492 1.76588 10.8827C1.74574 10.8995 1.73144 10.9105 1.72393 10.9161L1.71818 10.9203C1.53802 11.0432 1.45817 11.269 1.52149 11.4781C1.58534 11.689 1.77971 11.8333 2.00004 11.8333H14C14.2204 11.8333 14.4147 11.689 14.4786 11.4781C14.5419 11.269 14.4621 11.0432 14.2819 10.9203L14.2762 10.9161C14.2686 10.9105 14.2543 10.8995 14.2342 10.8827C14.1939 10.8492 14.1302 10.7922 14.0505 10.7081C13.8914 10.5402 13.6674 10.2626 13.439 9.84383C12.9836 9.0089 12.5 7.59292 12.5 5.33325C12.5 4.13978 12.0259 2.99519 11.182 2.15127C10.3381 1.30736 9.19351 0.833252 8.00004 0.833252ZM12.5611 10.3227C12.6658 10.5147 12.7712 10.6843 12.8735 10.8333H3.12659C3.22891 10.6843 3.33427 10.5147 3.43899 10.3227C3.98357 9.32427 4.50004 7.74026 4.50004 5.33325C4.50004 4.40499 4.86879 3.51476 5.52517 2.85838C6.18154 2.202 7.07178 1.83325 8.00004 1.83325C8.9283 1.83325 9.81854 2.202 10.4749 2.85838C11.1313 3.51476 11.5 4.40499 11.5 5.33325C11.5 7.74026 12.0165 9.32427 12.5611 10.3227ZM7.27922 13.749C7.14066 13.5101 6.8347 13.4288 6.59583 13.5674C6.35697 13.7059 6.27566 14.0119 6.41422 14.2508C6.57538 14.5286 6.8067 14.7592 7.08501 14.9195C7.36333 15.0798 7.67887 15.1642 8.00005 15.1642C8.32123 15.1642 8.63678 15.0798 8.91509 14.9195C9.19341 14.7592 9.42473 14.5286 9.58589 14.2508C9.72445 14.0119 9.64313 13.7059 9.40427 13.5674C9.16541 13.4288 8.85945 13.5101 8.72088 13.749C8.64763 13.8753 8.54249 13.9801 8.41598 14.053C8.28947 14.1258 8.14604 14.1642 8.00005 14.1642C7.85406 14.1642 7.71063 14.1258 7.58412 14.053C7.45762 13.9801 7.35247 13.8753 7.27922 13.749Z" /></svg>;
