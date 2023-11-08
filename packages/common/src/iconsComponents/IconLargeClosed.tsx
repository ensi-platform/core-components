import { SVGProps } from "react";

export const IconLargeClosed = ({ title, ...props}: SVGProps<SVGSVGElement> & { title?: string }) => <svg width={32} height={32} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>{title && <title>{title}</title>}<path fillRule="evenodd" clipRule="evenodd" d="M28.2068 5.20711C28.5973 4.81658 28.5973 4.18342 28.2068 3.79289C27.8162 3.40237 27.1831 3.40237 26.7925 3.79289L15.9998 14.5856L5.20711 3.79289C4.81658 3.40237 4.18342 3.40237 3.79289 3.79289C3.40237 4.18342 3.40237 4.81658 3.79289 5.20711L14.5856 15.9998L3.79289 26.7925C3.40237 27.1831 3.40237 27.8162 3.79289 28.2068C4.18342 28.5973 4.81658 28.5973 5.20711 28.2068L15.9998 17.414L26.7925 28.2068C27.1831 28.5973 27.8162 28.5973 28.2068 28.2068C28.5973 27.8162 28.5973 27.1831 28.2068 26.7925L17.414 15.9998L28.2068 5.20711Z" /></svg>;
