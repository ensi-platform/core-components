import type { SVGProps } from 'react';

export const IconSmallNoVideo = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.31352 0.606408C1.11825 0.411145 0.80167 0.411145 0.606408 0.606408C0.411146 0.80167 0.411146 1.11825 0.606408 1.31351L2.31285 3.01996H2.23996C1.76788 3.01996 1.31513 3.20749 0.981312 3.54131C0.647497 3.87512 0.459961 4.32787 0.459961 4.79996V11.2C0.459961 11.672 0.647497 12.1248 0.981312 12.4586C1.31513 12.7924 1.76788 12.98 2.23996 12.98H9.27996C9.75205 12.98 10.2048 12.7924 10.5386 12.4586C10.7526 12.2447 10.9064 11.9819 10.9893 11.6964L14.6864 15.3935C14.8817 15.5888 15.1983 15.5888 15.3935 15.3935C15.5888 15.1983 15.5888 14.8817 15.3935 14.6864L10.9147 10.2076C10.9143 10.2072 10.9139 10.2068 10.9135 10.2064L3.87351 3.1664C3.87314 3.16603 3.87277 3.16566 3.8724 3.16529L1.31352 0.606408ZM10.06 10.7671L3.31286 4.01996H2.23996C2.03309 4.01996 1.8347 4.10214 1.68842 4.24841C1.54214 4.39469 1.45996 4.59309 1.45996 4.79996V11.2C1.45996 11.4068 1.54214 11.6052 1.68842 11.7515C1.8347 11.8978 2.03309 11.98 2.23996 11.98H9.27996C9.48683 11.98 9.68523 11.8978 9.8315 11.7515C9.97778 11.6052 10.06 11.4068 10.06 11.2V10.7671ZM7.14236 4.01996H9.27996C9.48683 4.01996 9.68523 4.10214 9.8315 4.24841C9.97778 4.39469 10.06 4.59309 10.06 4.79996V6.93756C10.06 7.07017 10.1126 7.19734 10.2064 7.29111L10.8464 7.93111C11.02 8.10474 11.294 8.1266 11.493 7.98268L14.54 5.77872V11.2C14.54 11.4761 14.7638 11.7 15.04 11.7C15.3161 11.7 15.54 11.4761 15.54 11.2V4.79996C15.54 4.61213 15.4347 4.44014 15.2674 4.35469C15.1002 4.26924 14.8991 4.28475 14.7469 4.39483L11.2522 6.92268L11.06 6.73045V4.79996C11.06 4.32787 10.8724 3.87512 10.5386 3.54131C10.2048 3.20749 9.75205 3.01996 9.27996 3.01996H7.14236C6.86622 3.01996 6.64236 3.24382 6.64236 3.51996C6.64236 3.7961 6.86622 4.01996 7.14236 4.01996Z"
        />
    </svg>
);
