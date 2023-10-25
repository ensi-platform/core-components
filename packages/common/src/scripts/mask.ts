/** Телефонный номер (+7(000) 000-00-00) */
export const maskPhone = '+7(000) 000-00-00';

/** Одиночная дата (00.00.0000) */
export const maskDateSingle = '00.00.0000';

/** Диапазон дат (00.00.0000 — 00.00.0000) */
export const maskDateRange = '00.00.0000 — 00.00.0000';

export const getMaskTime = (prefix?: string) => (prefix ? `${prefix} 00:00:00` : '00:00:00');
