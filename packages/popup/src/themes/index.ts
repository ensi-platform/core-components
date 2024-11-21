// eslint-disable-next-line import/no-cycle
import type { PopupTheme } from '../types';
import { basicTheme } from './basic';

export const popupThemes = {
    basic: basicTheme,
};

export const setBasicPopupTheme = (popupTheme: PopupTheme) => {
    popupThemes.basic = popupTheme;
};
