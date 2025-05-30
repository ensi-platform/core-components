import type { SVGProps } from 'react';

export const IconSmallStatusError = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C9.61492 1.5 11.0923 2.08893 12.2291 3.06374L3.06374 12.2291C2.08893 11.0923 1.5 9.61492 1.5 8ZM3.77084 12.9362C4.90762 13.911 6.38503 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 6.38503 13.911 4.90762 12.9362 3.77084L3.77084 12.9362ZM8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5Z"
        />
    </svg>
);
