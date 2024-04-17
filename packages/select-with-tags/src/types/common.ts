import { SelectItem } from '@greensight/core-components-select';
import type { FC } from 'react';
import { TagProps } from '@greensight/core-components-tags';

export type OptionMatcher = (option: SelectItem, inputValue: string) => boolean;

export type TagComponent = FC<TagProps>;
