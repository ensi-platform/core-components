import { type actions } from '../scripts/constants';

export type Actions = typeof actions extends { [key: string]: (...args: any) => infer U } ? U : never;
