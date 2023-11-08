import { SVGProps } from "react";

export const IconStar = ({ title, ...props}: SVGProps<SVGSVGElement> & { title?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width={16} height={15} viewBox="0 0 16 15" {...props}>{title && <title>{title}</title>}<path fillRule="evenodd" d="M7.941.748l2.192 4.531 5.113.624-3.759 3.425.969 4.917-4.515-2.414-4.514 2.414.969-4.917L.637 5.903l5.113-.624L7.941.748z" /></svg>;
