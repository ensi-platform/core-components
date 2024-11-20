/**
 * A set of constants for z-index values corresponding to component classes.
 *
 * Values are chosen based on priority.
 */
export enum StackingOrderEnum {
    /**
     * For focusable components such as buttons and input fields
     */
    FOCUSED = 2,

    /**
     * Default value
     */
    DEFAULT = 10,

    /**
     * For modal windows with overlays
     */
    MODAL = 50,

    /**
     * For components that manage their position, such as popovers and tooltips
     */
    POPOVER = 100,

    /**
     * For toasts and notifications
     */
    TOAST = 1000,
}
