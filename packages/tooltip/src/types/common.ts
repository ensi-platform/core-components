
/**
 * Common types used across the application.
 */
export type TriggerType = 'click' | 'hover';

export interface ITooltipState {
    /**
     * Tooltip appearance (tooltip or hint)
     */
    view?: 'tooltip' | 'hint';

    /**
     * Tag for the target wrapper
     * @default div
     */
    targetTag?: 'div' | 'span';
}
