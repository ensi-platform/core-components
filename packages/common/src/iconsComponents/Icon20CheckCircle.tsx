import { SVGProps } from "react";

export const Icon20CheckCircle = ({ title, ...props}: SVGProps<SVGSVGElement> & { title?: string }) => <svg width={20} height={20} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>{title && <title>{title}</title>}<path fillRule="evenodd" clipRule="evenodd" d="M3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10ZM10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1ZM14.8575 7.80582C15.2335 7.4013 15.2104 6.76856 14.8059 6.39255C14.4014 6.01654 13.7686 6.03966 13.3926 6.44418L9.39637 10.7435L7.77272 9.36312C7.35194 9.00539 6.72084 9.05651 6.36312 9.47728C6.00539 9.89806 6.05651 10.5292 6.47728 10.8869L8.82979 12.8869C9.23744 13.2335 9.84567 13.1977 10.21 12.8058L14.8575 7.80582Z" /></svg>;
