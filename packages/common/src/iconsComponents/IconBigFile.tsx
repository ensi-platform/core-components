import { type SVGProps } from 'react';

export const IconBigFile = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={48} height={48} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.2224 7C13.1026 7 12.0286 7.44486 11.2367 8.23672C10.4449 9.02858 10 10.1026 10 11.2224V37.0018C10 38.1217 10.4449 39.1957 11.2367 39.9875C12.0286 40.7794 13.1026 41.2242 14.2224 41.2242H33.557C34.6768 41.2242 35.7508 40.7794 36.5427 39.9875C37.3345 39.1957 37.7794 38.1217 37.7794 37.0018V19.292C37.7794 19.2875 37.7795 19.283 37.7795 19.2785C37.7795 18.9983 37.6642 18.745 37.4785 18.5634L26.2161 7.30101C26.0346 7.11528 25.7812 7 25.501 7C25.501 7 25.5009 7 25.5009 7H14.2224ZM24.501 9H14.2224C13.633 9 13.0677 9.23415 12.6509 9.65093C12.2341 10.0677 12 10.633 12 11.2224V37.0018C12 37.5912 12.2341 38.1565 12.6509 38.5733C13.0677 38.9901 13.633 39.2242 14.2224 39.2242H33.557C34.1464 39.2242 34.7117 38.9901 35.1285 38.5733C35.5452 38.1565 35.7794 37.5912 35.7794 37.0018V20.2785H25.501C24.9487 20.2785 24.501 19.8308 24.501 19.2785V9ZM34.3652 18.2785L26.501 10.4143V18.2785H34.3652Z"
        />
    </svg>
);
