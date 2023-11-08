import { SVGProps } from "react";

export const IconSmallCheckSquare = ({ title, ...props}: SVGProps<SVGSVGElement> & { title?: string }) => <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>{title && <title>{title}</title>}<path fillRule="evenodd" clipRule="evenodd" d="M2.5 5C2.5 3.61929 3.61929 2.5 5 2.5H10.6667C10.9428 2.5 11.1667 2.27614 11.1667 2C11.1667 1.72386 10.9428 1.5 10.6667 1.5H5C3.067 1.5 1.5 3.067 1.5 5V11C1.5 12.933 3.067 14.5 5 14.5H11C12.933 14.5 14.5 12.933 14.5 11V8C14.5 7.72386 14.2761 7.5 14 7.5C13.7239 7.5 13.5 7.72386 13.5 8V11C13.5 12.3807 12.3807 13.5 11 13.5H5C3.61929 13.5 2.5 12.3807 2.5 11V5ZM15.0202 3.02022C15.2155 2.82496 15.2155 2.50838 15.0202 2.31311C14.825 2.11785 14.5084 2.11785 14.3131 2.31311L8 8.62623L6.35355 6.97978C6.15829 6.78452 5.84171 6.78452 5.64645 6.97978C5.45118 7.17504 5.45118 7.49162 5.64645 7.68689L7.64645 9.68689C7.84171 9.88215 8.15829 9.88215 8.35355 9.68689L15.0202 3.02022Z" /></svg>;
