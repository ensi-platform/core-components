import { BasePlacement, Obj, VariationPlacement } from '@popperjs/core';

export type RefElementType = HTMLElement | null;

export type PositionType = BasePlacement | VariationPlacement;

export interface IPopperModifier {
    name: string;
    options: Obj;
};
