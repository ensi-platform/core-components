import { SVGProps } from 'react';

export const IconSmallEyeOff = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.85355 1.14645C1.65829 0.951184 1.34171 0.951184 1.14645 1.14645C0.951184 1.34171 0.951184 1.65829 1.14645 1.85355L3.91448 4.62158C2.75001 5.60145 1.78064 6.79455 1.05942 8.1386C0.982605 8.28176 0.980131 8.45331 1.05279 8.59862L1.5 8.37502C1.05279 8.59862 1.05287 8.59879 1.05297 8.59899L1.05321 8.59946L1.05386 8.60076L1.05586 8.60472L1.06263 8.61797C1.06837 8.62914 1.07657 8.64493 1.08721 8.66503C1.10847 8.70522 1.13951 8.7627 1.18018 8.83499C1.26147 8.97951 1.38145 9.18363 1.53896 9.42753C1.85338 9.91436 2.3206 10.5647 2.93211 11.217C4.14599 12.5118 5.98775 13.875 8.375 13.875V13.8751L8.38317 13.8749C9.68631 13.8536 10.9526 13.4581 12.0329 12.74L14.8964 15.6036C15.0917 15.7988 15.4083 15.7988 15.6036 15.6036C15.7988 15.4083 15.7988 15.0917 15.6036 14.8964L12.4411 11.734L10.0555 9.34844L10.052 9.34493L7.40507 6.69798L7.40159 6.6945L5.01605 4.30896L1.85355 1.14645ZM11.309 12.0161L9.67257 10.3797C9.55366 10.4613 9.42726 10.5322 9.29484 10.5912C9.00351 10.721 8.68902 10.7908 8.37013 10.7964C8.05123 10.802 7.73448 10.7434 7.43875 10.6239C7.14302 10.5045 6.87438 10.3267 6.64885 10.1012C6.42332 9.87564 6.24553 9.607 6.12608 9.31127C6.00663 9.01554 5.94797 8.69878 5.9536 8.37989C5.95923 8.061 6.02903 7.7465 6.15883 7.45517C6.21783 7.32276 6.28868 7.19636 6.37033 7.07745L4.62443 5.33155C3.59595 6.18336 2.73029 7.2152 2.07003 8.37705C2.14218 8.504 2.2455 8.67829 2.379 8.885C2.67006 9.33567 3.10127 9.93531 3.66164 10.533C4.79074 11.7374 6.38507 12.8735 8.37092 12.875C9.41303 12.8572 10.4274 12.5588 11.309 12.0161ZM7.09884 7.80597C7.08957 7.82448 7.08071 7.84322 7.07226 7.86217C6.99711 8.03083 6.9567 8.21291 6.95344 8.39753C6.95019 8.58215 6.98415 8.76554 7.0533 8.93675C7.12246 9.10796 7.22539 9.26349 7.35596 9.39406C7.48653 9.52463 7.64205 9.62756 7.81327 9.69671C7.98448 9.76587 8.16786 9.79983 8.35249 9.79657C8.53711 9.79331 8.71918 9.7529 8.88785 9.67775C8.9068 9.66931 8.92554 9.66045 8.94405 9.65117L7.09884 7.80597ZM7.17646 4.01186C7.56893 3.91999 7.97075 3.87407 8.37383 3.87501L8.375 3.87502C10.3627 3.87502 11.9585 5.0118 13.0884 6.21699C13.6487 6.81472 14.0799 7.41436 14.371 7.86503C14.5047 8.07199 14.6081 8.24646 14.6802 8.37344C14.345 8.96566 13.9558 9.52586 13.5174 10.0468C13.3396 10.2581 13.3668 10.5736 13.5781 10.7513C13.7894 10.9291 14.1048 10.902 14.2826 10.6907C14.8231 10.0483 15.2952 9.35117 15.691 8.61072C15.7674 8.46769 15.7697 8.29647 15.6972 8.15141L15.25 8.37502C15.6972 8.15141 15.6971 8.15124 15.697 8.15105L15.6968 8.15057L15.6961 8.14927L15.6941 8.14531L15.6874 8.13206C15.6816 8.12089 15.6734 8.1051 15.6628 8.085C15.6415 8.04481 15.6105 7.98733 15.5698 7.91504C15.4885 7.77052 15.3686 7.5664 15.211 7.3225C14.8966 6.83567 14.4294 6.18531 13.8179 5.53304C12.6041 4.23834 10.7626 2.87524 8.37559 2.87502H8.375V3.37502L8.37617 2.87502L8.37559 2.87502C7.89519 2.87393 7.4163 2.92869 6.94854 3.03817C6.67967 3.10111 6.51272 3.3701 6.57566 3.63897C6.6386 3.90785 6.90758 4.07479 7.17646 4.01186Z"
        />
    </svg>
);
