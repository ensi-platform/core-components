import { useTabsTheme } from '../../context';
import type { TabPropsType } from '../../types';

/**
 * Tab component
 * @param children tab content
 * @param className additional content container class
 * @param hidden is tab visually hidden
 * @param disabled is tab disabled
 */
export const Tab = ({ children, hidden, blocked, className, disabled, dataTestId }: TabPropsType) => {
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
