export {};
declare const UNDEFINED_VOID_ONLY: unique symbol;
type VoidOrUndefinedOnly = void | { [UNDEFINED_VOID_ONLY]: never };
type TransitionFunction = () => VoidOrUndefinedOnly;
interface TransitionStartFunction {
    /**
     * State updates caused inside the callback are allowed to be deferred.
     *
     * **If some state update causes a component to suspend, that state update should be wrapped in a transition.**
     *
     * @param callback A _synchronous_ function which causes state updates that can be deferred.
     */
    (callback: TransitionFunction): void;
}
type useTransitionType = () => [boolean, TransitionStartFunction];

declare global {
    interface Window {
        /** dataLayer object for GTM */
        dataLayer: any;
        gtag: any;
        [key: string]: any;
    }
    namespace React {
        function useTransition(): [boolean, TransitionStartFunction];
        function useId(): string;
    }
}
