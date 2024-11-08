import { type SVGProps } from 'react';

export const IconBigImage = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={48} height={48} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.3846 10C11.0676 10 10 11.0676 10 12.3846V36.0769C10 37.2633 10.8663 38.2473 12.0008 38.4308L30.293 20.1386C30.6835 19.7481 31.3167 19.7481 31.7072 20.1386L38.4615 26.893V12.3846C38.4615 11.0676 37.3939 10 36.0769 10H12.3846ZM40.4615 29.2928V12.3846C40.4615 9.96306 38.4985 8 36.0769 8H12.3846C9.96306 8 8 9.96306 8 12.3846V36.0769C8 38.4985 9.96306 40.4615 12.3846 40.4615H36.0769C38.4985 40.4615 40.4615 38.4985 40.4615 36.0769V29.3217C40.4617 29.3121 40.4617 29.3025 40.4615 29.2928ZM38.4615 29.7214L31.0001 22.26L14.7985 38.4615H36.0769C37.3939 38.4615 38.4615 37.3939 38.4615 36.0769V29.7214ZM18.3076 16.7688C17.4579 16.7688 16.7691 17.4576 16.7691 18.3073C16.7691 19.1569 17.4579 19.8457 18.3076 19.8457C19.1573 19.8457 19.8461 19.1569 19.8461 18.3073C19.8461 17.4576 19.1573 16.7688 18.3076 16.7688ZM14.7691 18.3073C14.7691 16.353 16.3534 14.7688 18.3076 14.7688C20.2618 14.7688 21.8461 16.353 21.8461 18.3073C21.8461 20.2615 20.2618 21.8457 18.3076 21.8457C16.3534 21.8457 14.7691 20.2615 14.7691 18.3073Z"
        />
    </svg>
);
