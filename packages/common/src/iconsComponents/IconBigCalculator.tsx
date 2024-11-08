import { SVGProps } from 'react';

export const IconBigCalculator = ({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) => (
    <svg width={48} height={48} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title && <title>{title}</title>}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 7C11.3431 7 10 8.34315 10 10V37.2308C10 38.8876 11.3431 40.2308 13 40.2308H35.7692C37.4261 40.2308 38.7692 38.8876 38.7692 37.2308V10C38.7692 8.34315 37.4261 7 35.7692 7H13ZM12 10C12 9.44772 12.4477 9 13 9H35.7692C36.3215 9 36.7692 9.44772 36.7692 10V37.2308C36.7692 37.7831 36.3215 38.2308 35.7692 38.2308H13C12.4477 38.2308 12 37.7831 12 37.2308V10ZM16.5769 15.9231C16.0246 15.9231 15.5769 16.3708 15.5769 16.9231C15.5769 17.4754 16.0246 17.9231 16.5769 17.9231H32.1923C32.7446 17.9231 33.1923 17.4754 33.1923 16.9231C33.1923 16.3708 32.7446 15.9231 32.1923 15.9231H16.5769ZM19.9231 25.8462C19.9231 27.0782 18.9243 28.0769 17.6923 28.0769C16.4603 28.0769 15.4615 27.0782 15.4615 25.8462C15.4615 24.6141 16.4603 23.6154 17.6923 23.6154C18.9243 23.6154 19.9231 24.6141 19.9231 25.8462ZM24.3846 28.0769C25.6167 28.0769 26.6154 27.0782 26.6154 25.8462C26.6154 24.6141 25.6167 23.6154 24.3846 23.6154C23.1526 23.6154 22.1539 24.6141 22.1539 25.8462C22.1539 27.0782 23.1526 28.0769 24.3846 28.0769ZM26.6154 32.5385C26.6154 33.7705 25.6167 34.7692 24.3846 34.7692C23.1526 34.7692 22.1539 33.7705 22.1539 32.5385C22.1539 31.3064 23.1526 30.3077 24.3846 30.3077C25.6167 30.3077 26.6154 31.3064 26.6154 32.5385ZM31.0769 34.7692C32.309 34.7692 33.3077 33.7705 33.3077 32.5385C33.3077 31.3064 32.309 30.3077 31.0769 30.3077C29.8449 30.3077 28.8462 31.3064 28.8462 32.5385C28.8462 33.7705 29.8449 34.7692 31.0769 34.7692ZM33.3077 25.8462C33.3077 27.0782 32.309 28.0769 31.0769 28.0769C29.8449 28.0769 28.8462 27.0782 28.8462 25.8462C28.8462 24.6141 29.8449 23.6154 31.0769 23.6154C32.309 23.6154 33.3077 24.6141 33.3077 25.8462ZM17.6923 34.7692C18.9243 34.7692 19.9231 33.7705 19.9231 32.5385C19.9231 31.3064 18.9243 30.3077 17.6923 30.3077C16.4603 30.3077 15.4616 31.3064 15.4616 32.5385C15.4616 33.7705 16.4603 34.7692 17.6923 34.7692Z"
        />
    </svg>
);
