import type { SVGProps } from 'react';

export const IconSmallBranch = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.52917 2.46826H6.52917V6.46826H2.52917L2.52917 2.46826ZM1.52917 2.46826C1.52917 1.91598 1.97689 1.46826 2.52917 1.46826H6.52917C7.08146 1.46826 7.52917 1.91598 7.52917 2.46826V6.46826C7.52917 7.02055 7.08146 7.46826 6.52917 7.46826H2.52917C1.97689 7.46826 1.52917 7.02055 1.52917 6.46826V2.46826ZM2.52917 9.53174H6.52917V13.5317H2.52917L2.52917 9.53174ZM1.52917 9.53174C1.52917 8.97945 1.97689 8.53174 2.52917 8.53174H6.52917C7.08146 8.53174 7.52917 8.97945 7.52917 9.53174V13.5317C7.52917 14.084 7.08146 14.5317 6.52917 14.5317H2.52917C1.97689 14.5317 1.52917 14.084 1.52917 13.5317V9.53174ZM13.4708 2.46826H9.47083V6.46826H13.4708V2.46826ZM9.47083 1.46826C8.91854 1.46826 8.47083 1.91598 8.47083 2.46826V6.46826C8.47083 7.02055 8.91854 7.46826 9.47083 7.46826H13.4708C14.0231 7.46826 14.4708 7.02055 14.4708 6.46826V2.46826C14.4708 1.91598 14.0231 1.46826 13.4708 1.46826H9.47083ZM9.47083 9.53174H13.4708V13.5317H9.47083V9.53174ZM8.47083 9.53174C8.47083 8.97945 8.91854 8.53174 9.47083 8.53174H13.4708C14.0231 8.53174 14.4708 8.97945 14.4708 9.53174V13.5317C14.4708 14.084 14.0231 14.5317 13.4708 14.5317H9.47083C8.91854 14.5317 8.47083 14.084 8.47083 13.5317V9.53174Z"
        />
    </svg>
);
