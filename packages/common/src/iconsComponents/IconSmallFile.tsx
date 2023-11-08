import { SVGProps } from "react";

export const IconSmallFile = ({ title, ...props}: SVGProps<SVGSVGElement> & { title?: string }) => <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>{title && <title>{title}</title>}<path fillRule="evenodd" clipRule="evenodd" d="M4.00008 0.833252C3.51385 0.833252 3.04754 1.02641 2.70372 1.37022C2.3599 1.71404 2.16675 2.18036 2.16675 2.66659V13.3333C2.16675 13.8195 2.3599 14.2858 2.70372 14.6296C3.04754 14.9734 3.51385 15.1666 4.00008 15.1666H12.0001C12.4863 15.1666 12.9526 14.9734 13.2964 14.6296C13.6403 14.2858 13.8334 13.8195 13.8334 13.3333V5.99992C13.8334 5.86943 13.7824 5.7442 13.6914 5.65089C13.6901 5.64949 13.6887 5.6481 13.6873 5.64671C13.6872 5.6466 13.6871 5.64648 13.687 5.64637L9.02078 0.980179L9.0203 0.979699C8.92653 0.88593 8.79936 0.833252 8.66675 0.833252M8.16675 1.83325H4.00008C3.77907 1.83325 3.56711 1.92105 3.41083 2.07733C3.25455 2.23361 3.16675 2.44557 3.16675 2.66659V13.3333C3.16675 13.5543 3.25455 13.7662 3.41083 13.9225C3.56711 14.0788 3.77907 14.1666 4.00008 14.1666H12.0001C12.2211 14.1666 12.4331 14.0788 12.5893 13.9225C12.7456 13.7662 12.8334 13.5543 12.8334 13.3333V6.49992H8.66675C8.39061 6.49992 8.16675 6.27606 8.16675 5.99992V1.83325ZM12.1263 5.49992L9.16675 2.54036V5.49992H12.1263Z" /></svg>;
