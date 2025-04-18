import type { SVGProps } from 'react';

export const IconSmallArrowUp = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.28261 6.82737L7.46459 3.64539C7.65985 3.45013 7.97643 3.45013 8.1717 3.64539L11.3537 6.82737C11.5489 7.02263 11.5489 7.33921 11.3537 7.53448C11.1584 7.72974 10.8418 7.72974 10.6466 7.53448L8.31814 5.20605L8.31814 12.001C8.31814 12.2771 8.09428 12.501 7.81814 12.501C7.542 12.501 7.31814 12.2771 7.31814 12.001L7.31814 5.20605L4.98972 7.53448C4.79445 7.72974 4.47787 7.72974 4.28261 7.53448C4.08735 7.33921 4.08735 7.02263 4.28261 6.82737Z"
        />
    </svg>
);
