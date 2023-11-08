import { SVGProps } from "react";

export const IconSmallMessage = ({ title, ...props}: SVGProps<SVGSVGElement> & { title?: string }) => <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>{title && <title>{title}</title>}<path fillRule="evenodd" clipRule="evenodd" d="M8.33203 2.33327C6.56474 2.32866 4.87008 3.27917 3.93908 4.78462C3.0074 6.29116 2.9157 8.22939 3.71298 9.80783C3.77308 9.92683 3.78318 10.0649 3.74102 10.1914L2.79058 13.0427L5.64189 12.0922C5.76837 12.0501 5.90644 12.0602 6.02543 12.1203C7.60387 12.9176 9.5421 12.8259 11.0486 11.8942C12.5541 10.9632 13.5046 9.26853 13.5 7.50123L13.5 7.49993C13.5 6.12663 12.9694 4.80421 11.9992 3.83406C11.0291 2.86391 9.70663 2.33327 8.33334 2.33327L8.33203 2.33327ZM8.33399 1.33327C6.2158 1.32798 4.20022 2.4611 3.08857 4.25865C2.01303 5.99782 1.87294 8.21239 2.72816 10.0677L1.52567 13.6751C1.46578 13.8548 1.51254 14.0529 1.64646 14.1868C1.78038 14.3207 1.97846 14.3675 2.15813 14.3076L5.76558 13.1051C7.62088 13.9603 9.83544 13.8202 11.5746 12.7447C13.3722 11.633 14.5053 9.61747 14.5 7.49928C14.5 7.49949 14.5 7.49971 14.5 7.49993H14L14.5 7.49863C14.5 7.49884 14.5 7.49906 14.5 7.49928C14.4998 5.86972 13.8699 4.29057 12.7063 3.12695C11.5427 1.96334 9.96354 1.33344 8.33399 1.33327Z" /></svg>;
