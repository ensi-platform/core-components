import { SVGProps } from "react";

export const IconArrowRight = ({ title, ...props}: SVGProps<SVGSVGElement> & { title?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width={8} height={14} viewBox="0 0 8 14" {...props}>{title && <title>{title}</title>}<path fillRule="evenodd" clipRule="evenodd" d="M.293.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L5.586 7 .293 1.707a1 1 0 010-1.414z" /></svg>;
