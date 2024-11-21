/* eslint-disable react-hooks/exhaustive-deps */
import { type EffectCallback, useEffect } from 'react';

export const useMount = (effect: EffectCallback) => {
    useEffect(effect, []);
};
