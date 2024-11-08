import { type SVGProps } from 'react';

export const IconSmallSettings = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <g clipPath="url(#clip0)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99996 1.16675C7.77895 1.16675 7.56698 1.25455 7.4107 1.41083C7.25442 1.56711 7.16663 1.77907 7.16663 2.00008V2.11341V2.11541H7.16662C7.16538 2.42744 7.07292 2.73231 6.90063 2.99247C6.72834 3.25263 6.48373 3.45673 6.19693 3.57965C6.14957 3.59995 6.09945 3.61276 6.04837 3.61773C5.78296 3.71407 5.49611 3.73866 5.21703 3.68806C4.90246 3.63103 4.6122 3.48106 4.38366 3.25751L4.37972 3.25366L4.37974 3.25363L4.33974 3.21363L4.33954 3.21344C4.26215 3.13596 4.17024 3.07449 4.06908 3.03256C3.96791 2.99062 3.85947 2.96903 3.74996 2.96903C3.64045 2.96903 3.53201 2.99062 3.43084 3.03256C3.32968 3.07449 3.23777 3.13596 3.16038 3.21344L3.15998 3.21383C3.0825 3.29123 3.02104 3.38313 2.9791 3.4843C2.93716 3.58546 2.91558 3.6939 2.91558 3.80341C2.91558 3.91293 2.93716 4.02137 2.9791 4.12253C3.02104 4.2237 3.0825 4.3156 3.15998 4.393L3.16018 4.39319L3.20018 4.43319L3.20408 4.43709L3.20406 4.43712C3.42761 4.66565 3.57757 4.95592 3.63461 5.27048C3.6907 5.57986 3.65438 5.8988 3.53037 6.18748C3.41853 6.48254 3.22188 6.73807 2.96503 6.92177C2.7039 7.10854 2.39262 7.21244 2.07165 7.21994L2.05996 7.22022V7.22008H1.99996C1.77895 7.22008 1.56698 7.30788 1.4107 7.46416C1.25442 7.62044 1.16663 7.8324 1.16663 8.05341C1.16663 8.27443 1.25442 8.48639 1.4107 8.64267C1.56698 8.79895 1.77895 8.88675 1.99996 8.88675H2.11329H2.11529C2.42732 8.888 2.73218 8.98046 2.99234 9.15275C3.25177 9.32455 3.45546 9.56826 3.57849 9.85402C3.70669 10.1458 3.74482 10.4693 3.68794 10.783C3.6309 11.0976 3.48094 11.3878 3.25739 11.6164L3.25353 11.6203L3.25351 11.6203L3.21351 11.6603L3.21332 11.6605C3.13584 11.7379 3.07437 11.8298 3.03243 11.931C2.9905 12.0321 2.96891 12.1406 2.96891 12.2501C2.96891 12.3596 2.9905 12.468 3.03243 12.5692C3.07437 12.6704 3.13584 12.7623 3.21332 12.8397L3.21371 12.8401C3.2911 12.9175 3.38301 12.979 3.48418 13.0209C3.58534 13.0629 3.69378 13.0845 3.80329 13.0845C3.91281 13.0845 4.02124 13.0629 4.12241 13.0209C4.22358 12.979 4.31548 12.9175 4.39288 12.8401L4.39307 12.8399L4.43307 12.7999L4.43697 12.796L4.43699 12.796C4.66553 12.5724 4.9558 12.4225 5.27036 12.3654C5.57974 12.3093 5.89867 12.3457 6.18735 12.4697C6.48241 12.5815 6.73794 12.7782 6.92165 13.035C7.10842 13.2961 7.21232 13.6074 7.21982 13.9284L7.2201 13.9401H7.21996V14.0001C7.21996 14.2211 7.30776 14.4331 7.46404 14.5893C7.62032 14.7456 7.83228 14.8334 8.05329 14.8334C8.27431 14.8334 8.48627 14.7456 8.64255 14.5893C8.79883 14.4331 8.88663 14.2211 8.88663 14.0001V13.8867L8.88663 13.8848C8.88787 13.5727 8.98033 13.2679 9.15263 13.0077C9.32444 12.7483 9.56817 12.5446 9.85395 12.4215C10.1458 12.2933 10.4692 12.2552 10.7829 12.3121C11.0975 12.3691 11.3877 12.5191 11.6163 12.7427L11.6202 12.7465L11.6202 12.7465L11.6602 12.7865L11.6604 12.7867C11.7378 12.8642 11.8297 12.9257 11.9308 12.9676C12.032 13.0095 12.1404 13.0311 12.25 13.0311C12.3595 13.0311 12.4679 13.0095 12.5691 12.9676C12.6702 12.9257 12.7621 12.8642 12.8395 12.7867L12.8399 12.7863C12.9174 12.7089 12.9789 12.617 13.0208 12.5159C13.0628 12.4147 13.0843 12.3063 13.0843 12.1967C13.0843 12.0872 13.0628 11.9788 13.0208 11.8776C12.9789 11.7765 12.9174 11.6846 12.8399 11.6072L12.8397 11.607L12.7997 11.567L12.7958 11.5631L12.7959 11.563C12.5723 11.3345 12.4223 11.0442 12.3653 10.7297C12.3084 10.416 12.3466 10.0926 12.4747 9.80074C12.5978 9.51496 12.8015 9.27123 13.0609 9.09941C13.3211 8.92712 13.6259 8.83466 13.938 8.83342L13.94 8.83341L14 8.83342C14.221 8.83342 14.4329 8.74562 14.5892 8.58934C14.7455 8.43306 14.8333 8.22109 14.8333 8.00008C14.8333 7.77907 14.7455 7.56711 14.5892 7.41083C14.4329 7.25455 14.221 7.16675 14 7.16675H13.8866L13.8846 7.16674C13.5726 7.1655 13.2677 7.07304 13.0076 6.90075C12.7474 6.72846 12.5433 6.48385 12.4204 6.19705C12.4001 6.14969 12.3873 6.09957 12.3823 6.04849C12.286 5.78308 12.2614 5.49623 12.312 5.21715C12.369 4.90259 12.519 4.61232 12.7425 4.38378L12.7464 4.37984L12.7464 4.37986L12.7864 4.33986L12.7866 4.33966C12.8641 4.26227 12.9255 4.17036 12.9675 4.0692C13.0094 3.96803 13.031 3.85959 13.031 3.75008C13.031 3.64057 13.0094 3.53213 12.9675 3.43096C12.9255 3.3298 12.8641 3.23789 12.7866 3.1605L12.7862 3.1601C12.7088 3.08262 12.6169 3.02116 12.5157 2.97922C12.4146 2.93728 12.3061 2.9157 12.1966 2.9157C12.0871 2.9157 11.9787 2.93728 11.8775 2.97922C11.7763 3.02116 11.6844 3.08262 11.607 3.1601L11.6068 3.1603L11.5669 3.2003L11.5629 3.2042L11.5629 3.20418C11.3344 3.42773 11.0441 3.57769 10.7296 3.63473C10.4159 3.6916 10.0924 3.65348 9.80057 3.52528C9.51481 3.40224 9.2711 3.19856 9.09929 2.93913C8.927 2.67897 8.83454 2.37411 8.8333 2.06208L8.83329 2.06008V2.00008C8.83329 1.77907 8.7455 1.56711 8.58921 1.41083C8.43293 1.25455 8.22097 1.16675 7.99996 1.16675ZM6.7036 0.703719C7.04741 0.359902 7.51373 0.166748 7.99996 0.166748C8.48619 0.166748 8.95251 0.359902 9.29632 0.703719C9.64014 1.04754 9.83329 1.51385 9.83329 2.00008V2.0589C9.83392 2.17563 9.86858 2.28965 9.93304 2.38698C9.99765 2.48454 10.0894 2.56108 10.1969 2.60718L10.2019 2.60929L10.2018 2.60932C10.3115 2.65772 10.4332 2.67216 10.5511 2.65077C10.6683 2.62952 10.7765 2.57388 10.862 2.49096L10.8995 2.45339C11.0698 2.28293 11.272 2.14771 11.4946 2.05545C11.7171 1.96319 11.9557 1.9157 12.1966 1.9157C12.4376 1.9157 12.6761 1.96319 12.8987 2.05545C13.1212 2.14771 13.3234 2.28293 13.4937 2.45339C13.664 2.62358 13.7991 2.82563 13.8913 3.04802C13.9835 3.27059 14.031 3.50915 14.031 3.75008C14.031 3.99101 13.9835 4.22958 13.8913 4.45214C13.799 4.67462 13.6639 4.87674 13.4935 5.04697C13.4934 5.04703 13.4934 5.0471 13.4933 5.04716L13.4557 5.08474C13.3728 5.17018 13.3172 5.27837 13.2959 5.39556C13.2745 5.51352 13.289 5.63519 13.3374 5.74487C13.3553 5.78544 13.3677 5.8281 13.3743 5.87173C13.4203 5.94974 13.4836 6.01662 13.5597 6.067C13.6571 6.13146 13.7711 6.16612 13.8878 6.16675H14C14.4862 6.16675 14.9525 6.3599 15.2963 6.70372C15.6401 7.04754 15.8333 7.51385 15.8333 8.00008C15.8333 8.48631 15.6401 8.95263 15.2963 9.29644C14.9525 9.64026 14.4862 9.83342 14 9.83342H13.9411C13.8244 9.83404 13.7104 9.8687 13.6131 9.93316C13.5155 9.99777 13.439 10.0895 13.3929 10.197L13.3907 10.202L13.3907 10.202C13.3423 10.3116 13.3279 10.4333 13.3493 10.5513C13.3705 10.6685 13.4262 10.7767 13.5091 10.8621L13.5466 10.8997C13.7171 11.0699 13.8523 11.2721 13.9446 11.4947C14.0369 11.7173 14.0843 11.9558 14.0843 12.1967C14.0843 12.4377 14.0369 12.6762 13.9446 12.8988C13.8524 13.1213 13.7172 13.3234 13.5468 13.4936C13.3766 13.664 13.1745 13.7992 12.952 13.8914C12.7295 13.9836 12.4909 14.0311 12.25 14.0311C12.009 14.0311 11.7705 13.9836 11.5479 13.8914C11.3253 13.7991 11.1231 13.6639 10.9529 13.4934L10.9153 13.4559C10.8299 13.373 10.7217 13.3173 10.6045 13.2961C10.4865 13.2747 10.3649 13.2891 10.2552 13.3375L10.2503 13.3397L10.2503 13.3397C10.1427 13.3857 10.051 13.4623 9.98637 13.5598C9.92191 13.6572 9.88725 13.7712 9.88663 13.8879V14.0001C9.88663 14.4863 9.69347 14.9526 9.34966 15.2964C9.00584 15.6403 8.53952 15.8334 8.05329 15.8334C7.56706 15.8334 7.10075 15.6403 6.75693 15.2964C6.41311 14.9526 6.21996 14.4863 6.21996 14.0001V13.9468C6.2162 13.8282 6.17736 13.7133 6.10828 13.6168C6.03824 13.5188 5.94036 13.4442 5.82737 13.4027C5.81748 13.399 5.80771 13.3951 5.79808 13.3908C5.6884 13.3424 5.56674 13.328 5.44877 13.3494C5.33158 13.3706 5.22338 13.4263 5.13793 13.5092L5.10038 13.5468C4.93011 13.7172 4.72791 13.8525 4.50535 13.9447C4.28279 14.037 4.04422 14.0845 3.80329 14.0845C3.56236 14.0845 3.3238 14.037 3.10124 13.9447C2.87884 13.8525 2.67679 13.7174 2.5066 13.5472C2.33615 13.3769 2.20092 13.1747 2.10866 12.9521C2.0164 12.7296 1.96891 12.491 1.96891 12.2501C1.96891 12.0092 2.0164 11.7706 2.10866 11.548C2.20092 11.3255 2.33615 11.1233 2.5066 10.953L2.54417 10.9154C2.62709 10.83 2.68274 10.7218 2.70398 10.6046C2.72537 10.4866 2.71093 10.365 2.66253 10.2553L2.66036 10.2504L2.66039 10.2504C2.61429 10.1428 2.53776 10.0511 2.44019 9.98649C2.34286 9.92203 2.22884 9.88737 2.11212 9.88675H1.99996C1.51373 9.88675 1.04741 9.69359 0.703597 9.34978C0.35978 9.00596 0.166626 8.53965 0.166626 8.05341C0.166626 7.56718 0.35978 7.10087 0.703597 6.75705C1.04741 6.41324 1.51373 6.22008 1.99996 6.22008H2.05324C2.17184 6.21632 2.28671 6.17748 2.38329 6.1084C2.48121 6.03836 2.5558 5.94049 2.59736 5.82749C2.60099 5.8176 2.60494 5.80784 2.60919 5.7982C2.6576 5.68852 2.67204 5.56686 2.65065 5.44889C2.6294 5.3317 2.57376 5.2235 2.49083 5.13806L2.45327 5.1005C2.28281 4.93023 2.14759 4.72803 2.05533 4.50547C1.96307 4.28291 1.91558 4.04434 1.91558 3.80341C1.91558 3.56249 1.96307 3.32392 2.05533 3.10136C2.14755 2.87888 2.28271 2.67675 2.45307 2.50653C2.6233 2.33616 2.82542 2.20101 3.0479 2.10878C3.27047 2.01652 3.50903 1.96903 3.74996 1.96903C3.99089 1.96903 4.22945 2.01652 4.45202 2.10878C4.67458 2.20104 4.87678 2.33627 5.04704 2.50672L5.08461 2.54429C5.17005 2.62721 5.27825 2.68286 5.39544 2.70411C5.5134 2.7255 5.63507 2.71106 5.74474 2.66265C5.78531 2.64474 5.82798 2.63236 5.87161 2.62574C5.94962 2.5797 6.0165 2.5164 6.06688 2.44032C6.13134 2.34298 6.166 2.22897 6.16663 2.11224V2.00008C6.16663 1.51385 6.35978 1.04754 6.7036 0.703719ZM13.5468 13.4936C13.5468 13.4937 13.5467 13.4938 13.5466 13.4938L13.1933 13.1401L13.547 13.4934C13.547 13.4935 13.5469 13.4936 13.5468 13.4936ZM7.99996 6.50008C7.17153 6.50008 6.49996 7.17165 6.49996 8.00008C6.49996 8.82851 7.17153 9.50008 7.99996 9.50008C8.82839 9.50008 9.49996 8.82851 9.49996 8.00008C9.49996 7.17165 8.82839 6.50008 7.99996 6.50008ZM5.49996 8.00008C5.49996 6.61937 6.61925 5.50008 7.99996 5.50008C9.38067 5.50008 10.5 6.61937 10.5 8.00008C10.5 9.38079 9.38067 10.5001 7.99996 10.5001C6.61925 10.5001 5.49996 9.38079 5.49996 8.00008Z"
            />
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width={16} height={16} />
            </clipPath>
        </defs>
    </svg>
);
