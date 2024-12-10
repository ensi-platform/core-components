import { useTabsTheme } from '../../context';
import type { TabProps } from '../../types';

export const Tab = ({ children, hidden, blocked, className, disabled, dataTestId }: TabProps) => {
    const { getCSS } = useTabsTheme();
    if (!children) return null;
    if (blocked) return null;

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
