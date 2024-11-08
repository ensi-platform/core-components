import { type SVGProps } from 'react';

export const IconSmallAward = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <g clipPath="url(#clip0)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.83325 5.33342C3.83325 3.03223 5.69873 1.16675 7.99992 1.16675C10.3011 1.16675 12.1666 3.03223 12.1666 5.33342C12.1666 6.78258 11.4268 8.05896 10.3042 8.80546C10.2704 8.82222 10.239 8.84263 10.2103 8.86612C9.56962 9.26782 8.81189 9.50008 7.99992 9.50008C5.69873 9.50008 3.83325 7.6346 3.83325 5.33342ZM10.127 10.0433C9.47833 10.3367 8.7582 10.5001 7.99992 10.5001C7.24195 10.5001 6.5221 10.3369 5.87361 10.0437L5.29885 14.371L7.74271 12.9047C7.90105 12.8097 8.09887 12.8097 8.25721 12.9047L10.7012 14.3711L10.127 10.0433ZM4.93767 9.49522C3.66129 8.55449 2.83325 7.04065 2.83325 5.33342C2.83325 2.47994 5.14645 0.166748 7.99992 0.166748C10.8534 0.166748 13.1666 2.47994 13.1666 5.33342C13.1666 7.04028 12.3389 8.55382 11.063 9.4946L11.8289 15.2677C11.8542 15.458 11.7682 15.6459 11.6078 15.7513C11.4473 15.8567 11.2407 15.8609 11.076 15.7622L7.99996 13.9165L4.92387 15.7622C4.75924 15.8609 4.55258 15.8567 4.39211 15.7513C4.23164 15.6459 4.1457 15.4579 4.17098 15.2676L4.93767 9.49522Z"
            />
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width={16} height={16} />
            </clipPath>
        </defs>
    </svg>
);
