import { useTabsTheme } from '../../context';
import type { TabPropsType } from '../../types';

export const Tab = ({ children, hidden, className, disabled, dataTestId }: TabPropsType) => {
    const { getCSS } = useTabsTheme();
    if (!children) return null;

    return (
        <div
            className={className}
            css={getCSS('tab', { hidden })}
            hidden={hidden}
            role="tabpanel"
            tabIndex={disabled ? -1 : 0}
            data-test-id={dataTestId}
        >
            {children}
        </div>
    );
};

Tab.displayName = 'Tab';
