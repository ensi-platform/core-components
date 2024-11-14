import type { SVGProps } from 'react';

export const IconSmallPhone = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.97743 3.01779C4.81173 3.0266 4.63973 3.03575 4.50047 3.03575V2.53581L4.50099 3.03575C4.26503 3.03599 3.97165 3.30464 4.00174 3.69105C4.47134 8.53006 8.07881 12.4768 12.4229 12.9985C12.6544 13.0186 12.9631 12.7844 12.9616 12.3972L12.9616 12.3953C12.9616 12.236 12.9711 12.045 12.9803 11.8575C12.9849 11.7653 12.9894 11.674 12.9928 11.5878C13.0036 11.3064 13.0047 11.0385 12.9756 10.8019C12.946 10.5609 12.8898 10.3964 12.819 10.2935C12.7617 10.2103 12.6828 10.1471 12.5256 10.1222C12.0047 10.0466 11.4939 9.90658 11.0029 9.70533L11.0017 9.70483C10.8562 9.64477 10.7369 9.66276 10.5483 9.80834C10.3874 9.93255 10.2512 10.0896 10.0886 10.277C10.0212 10.3547 9.94931 10.4376 9.86921 10.5256C9.70658 10.7043 9.4395 10.7411 9.23461 10.6131C7.90072 9.77999 6.80221 8.5707 6.05003 7.11769C5.95387 6.93191 5.98351 6.70591 6.12434 6.55122C6.2036 6.46416 6.27856 6.38572 6.34901 6.312C6.52038 6.13268 6.66502 5.98132 6.7798 5.8019C6.91678 5.58776 6.95733 5.40856 6.88255 5.19004L6.88219 5.18898C6.7016 4.65738 6.57642 4.10558 6.50883 3.54402C6.48218 3.33969 6.4106 3.24353 6.34077 3.18569C6.25775 3.11693 6.12477 3.06044 5.92063 3.02865C5.71775 2.99704 5.48446 2.9956 5.23243 3.00537C5.15324 3.00844 5.06624 3.01307 4.97743 3.01779ZM6.97864 2.41555C7.26599 2.65355 7.44598 2.99148 7.5009 3.41828L7.50144 3.42248L7.50142 3.42248C7.56075 3.91658 7.67073 4.40129 7.82905 4.86732L7.35562 5.02815L7.82868 4.86626C8.03027 5.4553 7.87006 5.95329 7.62218 6.34077C7.47707 6.56762 7.27913 6.78612 7.10679 6.96797C7.69728 8.0015 8.48529 8.87535 9.41171 9.53039C9.56736 9.35467 9.74899 9.16206 9.93732 9.01671C10.2963 8.73965 10.7933 8.53717 11.3827 8.78027C11.7996 8.95107 12.232 9.06928 12.6718 9.13299L12.6766 9.13369L12.6766 9.13372C13.1061 9.20026 13.4284 9.41529 13.6426 9.72639C13.8436 10.0182 13.9294 10.3646 13.9681 10.6798C14.0074 10.9992 14.0034 11.3325 13.992 11.6263C13.9876 11.7412 13.9823 11.8464 13.9774 11.944C13.969 12.1129 13.9616 12.2594 13.9616 12.3953H13.4616L13.9616 12.3935C13.9648 13.2661 13.2459 14.0852 12.3203 13.9933L12.3104 13.9923L12.3104 13.9922C7.43352 13.4101 3.51313 9.02884 3.006 3.7833L3.00531 3.77618L3.00536 3.77618C2.93423 2.91155 3.57812 2.0367 4.49996 2.03575L4.50047 2.03575C4.61717 2.03575 4.73805 2.02915 4.87978 2.02141C4.97365 2.01628 5.07667 2.01066 5.19367 2.00612C5.46228 1.9957 5.77362 1.99368 6.07455 2.04056C6.37423 2.08724 6.70426 2.18829 6.97864 2.41555ZM7.35559 5.02816L7.35562 5.02815L7.35559 5.02816Z"
        />
    </svg>
);
