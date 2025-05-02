import type { IFormControlExtendsProps } from '../types';

export const getFormControlProps = <T extends IFormControlExtendsProps>({
    wrapperRef,
    label,
    hint,
    error,
    leftAddons,
    rightAddons,
    bottomAddons,
    fieldCSS,
    block,
    theme,
    size,
    variant,
    className,
    controlWrapperCSS,
    ...fieldProps
}: T) => ({
    fieldProps,
    formControlProps: {
        ref: wrapperRef,
        label,
        hint,
        error,
        leftAddons,
        rightAddons,
        bottomAddons,
        block,
        theme,
        size,
        variant,
        className,
        fieldCSS,
        controlWrapperCSS,
    },
});
