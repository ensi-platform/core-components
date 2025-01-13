import { createContext } from 'react';

import { StackingOrderEnum } from '../scripts';

export const StackingContext = createContext(StackingOrderEnum.DEFAULT);
