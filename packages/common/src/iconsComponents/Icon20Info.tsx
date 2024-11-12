import { type SVGProps } from 'react';

export const Icon20Info = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={20} height={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10ZM9.32896 14.973C8.78707 14.8664 8.43423 14.3407 8.54087 13.7988L9.28451 10.0201H9.00637C8.45408 10.0201 8.00637 9.57236 8.00637 9.02007C8.00637 8.46779 8.45408 8.02007 9.00637 8.02008L10.5005 8.02008C10.7995 8.02008 11.0829 8.15392 11.2729 8.3849C11.4628 8.61587 11.5394 8.91974 11.4817 9.21317L10.5032 14.185C10.3966 14.7268 9.87085 15.0797 9.32896 14.973ZM10.7027 4.42171C9.99295 4.42171 9.41756 4.9971 9.41756 5.70689C9.41756 6.41667 9.99295 6.99206 10.7027 6.99207C11.4125 6.99207 11.9879 6.41667 11.9879 5.70689C11.9879 4.9971 11.4125 4.42171 10.7027 4.42171Z"
        />
    </svg>
);
