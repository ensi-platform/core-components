import { type SVGProps } from 'react';

export const IconSmallWatch = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.48153 2.10509C6.15535 2.18117 5.94425 2.28602 5.83862 2.38262C5.64668 2.55816 5.53087 2.90896 5.48482 3.45154C5.4694 3.63327 5.46274 3.81995 5.45901 4.00865C6.07792 3.69076 6.77976 3.51123 7.5229 3.51123C8.27081 3.51123 8.97674 3.69304 9.59841 4.01464C9.59468 3.82344 9.58801 3.63427 9.57233 3.4502C9.52607 2.9071 9.40982 2.55654 9.21749 2.38152C9.13234 2.30404 8.93641 2.20362 8.61378 2.12428C8.30555 2.04849 7.93397 2.00462 7.55263 2.00034C7.17109 1.99607 6.79656 2.03162 6.48153 2.10509ZM10.6123 4.73076C10.6062 4.59228 10.6043 4.43504 10.6021 4.25711L10.6017 4.2284C10.5985 3.96338 10.5941 3.66281 10.5687 3.36532C10.5206 2.80071 10.3889 2.09546 9.89053 1.64191C9.62177 1.39735 9.23283 1.24672 8.85256 1.15321C8.45789 1.05616 8.00853 1.00539 7.56383 1.00041C7.11933 0.995425 6.66271 1.036 6.2544 1.13123C5.85726 1.22385 5.45286 1.38027 5.16373 1.6447C4.66736 2.09867 4.53627 2.80294 4.4884 3.36698C4.46319 3.66413 4.4588 3.96433 4.45556 4.22905C4.45545 4.23828 4.45533 4.24745 4.45522 4.25657C4.45311 4.42993 4.45124 4.58369 4.44548 4.71959C3.557 5.54492 3 6.72465 3 8.03413C3 9.34071 3.55448 10.518 4.43949 11.3431C4.44543 11.4802 4.44733 11.6356 4.44947 11.8112L4.44982 11.8399C4.45307 12.1049 4.4575 12.4054 4.48284 12.7029C4.53093 13.2675 4.66262 13.9728 5.16103 14.4263C5.45002 14.6893 5.85369 14.8449 6.25008 14.937C6.65762 15.0316 7.1133 15.072 7.55689 15.0669C8.00065 15.0618 8.44906 15.0111 8.84293 14.9142C9.22239 14.8209 9.61066 14.6706 9.87903 14.4263C10.3774 13.9728 10.5091 13.2675 10.5572 12.7029C10.5826 12.4054 10.587 12.1049 10.5902 11.8399L10.5906 11.8112C10.5927 11.638 10.5946 11.4844 10.6003 11.3486C11.4888 10.5233 12.0458 9.34369 12.0458 8.03413C12.0458 6.73069 11.4938 5.55549 10.6123 4.73076ZM9.8222 10.7033C9.81515 10.7084 9.80822 10.7137 9.80139 10.7192L9.61914 10.8658C9.0334 11.3002 8.30886 11.557 7.5229 11.557C6.70521 11.557 5.95384 11.2791 5.35616 10.8121C5.35578 10.8118 5.3554 10.8115 5.35502 10.8113L5.3215 10.7847C4.51499 10.1383 4 9.14649 4 8.03413C4 6.96741 4.47355 6.01167 5.22363 5.36493C5.23604 5.35596 5.24812 5.34637 5.25982 5.33616L5.30271 5.29872C5.90878 4.80612 6.68073 4.51123 7.5229 4.51123C8.43708 4.51123 9.26892 4.85878 9.89535 5.42981C10.6029 6.07481 11.0458 7.00239 11.0458 8.03413C11.0458 9.10076 10.5722 10.0567 9.8222 10.7033ZM5.45321 12.0566C5.45695 12.2468 5.46363 12.435 5.47923 12.6181C5.52549 13.1612 5.64174 13.5117 5.83407 13.6867C5.93973 13.7829 6.15071 13.8872 6.47639 13.9629C6.79092 14.036 7.16473 14.0713 7.54543 14.0669C7.92596 14.0626 8.29666 14.0188 8.60411 13.9432C8.92597 13.864 9.12123 13.7639 9.20599 13.6867C9.39833 13.5117 9.51457 13.1612 9.56084 12.6181C9.57635 12.4359 9.58304 12.2488 9.5868 12.0596C8.96782 12.3775 8.26593 12.557 7.5229 12.557C6.77749 12.557 6.07356 12.3764 5.45321 12.0566ZM7.5229 5.81003C7.79904 5.81003 8.0229 6.03389 8.0229 6.31003V7.82703L8.7385 8.54263C8.93376 8.73789 8.93376 9.05447 8.7385 9.24974C8.54324 9.445 8.22666 9.445 8.0314 9.24974L7.16935 8.38769C7.07558 8.29392 7.0229 8.16674 7.0229 8.03413V6.31003C7.0229 6.03389 7.24676 5.81003 7.5229 5.81003Z"
        />
    </svg>
);
