import { SVGProps } from "react";

export const IconBigHash = ({ title, ...props}: SVGProps<SVGSVGElement> & { title?: string }) => <svg width={48} height={48} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>{title && <title>{title}</title>}<path fillRule="evenodd" clipRule="evenodd" d="M20.7771 8.0062C21.326 8.06719 21.7215 8.56161 21.6606 9.11052L20.7099 17.6668H28.3642L29.3394 8.88966C29.4004 8.34075 29.8949 7.94521 30.4438 8.0062C30.9927 8.06719 31.3882 8.56161 31.3272 9.11052L30.3765 17.6668H36.7778C37.3301 17.6668 37.7778 18.1145 37.7778 18.6668C37.7778 19.219 37.3301 19.6668 36.7778 19.6668H30.1543L29.3025 27.3334H36.7778C37.3301 27.3334 37.7778 27.7811 37.7778 28.3334C37.7778 28.8857 37.3301 29.3334 36.7778 29.3334H29.0802L28.105 38.1105C28.044 38.6594 27.5496 39.055 27.0007 38.994C26.4518 38.933 26.0562 38.4386 26.1172 37.8897L27.0679 29.3334H19.4136L18.4383 38.1105C18.3773 38.6594 17.8829 39.055 17.334 38.994C16.7851 38.933 16.3896 38.4386 16.4506 37.8897L17.4013 29.3334H11C10.4477 29.3334 10 28.8857 10 28.3334C10 27.7811 10.4477 27.3334 11 27.3334H17.6235L18.4753 19.6668H11C10.4477 19.6668 10 19.219 10 18.6668C10 18.1145 10.4477 17.6668 11 17.6668H18.6975L19.6728 8.88966C19.7338 8.34075 20.2282 7.94521 20.7771 8.0062ZM27.2901 27.3334L28.142 19.6668H20.4876L19.6358 27.3334H27.2901Z" /></svg>;
