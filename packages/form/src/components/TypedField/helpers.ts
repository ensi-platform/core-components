import { type DataType } from './types';

export const transformFloatValue = (input: string): string => {
    let sanitizedString: string = input.trim();

    // Remove any non-digit and non-decimal point characters from the string
    sanitizedString = sanitizedString.replace(/[^0-9.]/g, '');

    const parts = sanitizedString.split('.');

    // If the string ends with a dot, remove it
    sanitizedString = (parts.length > 2 ? parts.slice(0, -1) : parts).join('.');

    return sanitizedString;
};

export const getValueByDataType = (value: string, dataType?: DataType) => {
    if (!value) return '';
    return dataType === 'number' ? Number(value) : value;
};
