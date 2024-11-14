import type { SelectItem } from '@ensi-platform/core-components-select';
import type { ITagProps } from '@ensi-platform/core-components-tags';

import type { FC } from 'react';

export type OptionMatcher = (option: SelectItem, inputValue: string) => boolean;

export type TagComponent = FC<ITagProps>;
