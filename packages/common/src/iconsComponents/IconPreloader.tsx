import type { SVGProps } from 'react';

export const IconPreloader = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        {...props}
    >
        {title && <title>{title}</title>}
        <rect x={46} y={7.5} rx={4} ry={5.52} width={8} height={23}>
            <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="0.5s"
                begin="-0.4583333333333333s"
                repeatCount="indefinite"
            />
        </rect>
        <rect x={46} y={7.5} rx={4} ry={5.52} width={8} height={23} transform="rotate(30 50 50)">
            <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="0.5s"
                begin="-0.4166666666666667s"
                repeatCount="indefinite"
            />
        </rect>
        <rect x={46} y={7.5} rx={4} ry={5.52} width={8} height={23} transform="rotate(60 50 50)">
            <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="0.5s"
                begin="-0.375s"
                repeatCount="indefinite"
            />
        </rect>
        <rect x={46} y={7.5} rx={4} ry={5.52} width={8} height={23} transform="rotate(90 50 50)">
            <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="0.5s"
                begin="-0.3333333333333333s"
                repeatCount="indefinite"
            />
        </rect>
        <rect x={46} y={7.5} rx={4} ry={5.52} width={8} height={23} transform="rotate(120 50 50)">
            <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="0.5s"
                begin="-0.2916666666666667s"
                repeatCount="indefinite"
            />
        </rect>
        <rect x={46} y={7.5} rx={4} ry={5.52} width={8} height={23} transform="rotate(150 50 50)">
            <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="0.5s"
                begin="-0.25s"
                repeatCount="indefinite"
            />
        </rect>
        <rect x={46} y={7.5} rx={4} ry={5.52} width={8} height={23} transform="rotate(180 50 50)">
            <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="0.5s"
                begin="-0.20833333333333334s"
                repeatCount="indefinite"
            />
        </rect>
        <rect x={46} y={7.5} rx={4} ry={5.52} width={8} height={23} transform="rotate(210 50 50)">
            <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="0.5s"
                begin="-0.16666666666666666s"
                repeatCount="indefinite"
            />
        </rect>
        <rect x={46} y={7.5} rx={4} ry={5.52} width={8} height={23} transform="rotate(240 50 50)">
            <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="0.5s"
                begin="-0.125s"
                repeatCount="indefinite"
            />
        </rect>
        <rect x={46} y={7.5} rx={4} ry={5.52} width={8} height={23} transform="rotate(270 50 50)">
            <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="0.5s"
                begin="-0.08333333333333333s"
                repeatCount="indefinite"
            />
        </rect>
        <rect x={46} y={7.5} rx={4} ry={5.52} width={8} height={23} transform="rotate(300 50 50)">
            <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="0.5s"
                begin="-0.041666666666666664s"
                repeatCount="indefinite"
            />
        </rect>
        <rect x={46} y={7.5} rx={4} ry={5.52} width={8} height={23} transform="rotate(330 50 50)">
            <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="0.5s"
                begin="0s"
                repeatCount="indefinite"
            />
        </rect>
    </svg>
);
