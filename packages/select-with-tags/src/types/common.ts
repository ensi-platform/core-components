import { SelectItem } from '@ensi-platform/core-components-select';
import type { FC } from 'react';
import { ITagProps } from '@ensi-platform/core-components-tags';

export type OptionMatcher = (option: SelectItem, inputValue: string) => boolean;

export type TagComponent = FC<ITagProps>;
