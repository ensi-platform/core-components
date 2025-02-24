/** Names (Latin and Cyrillic letters, dashes and spaces) */
export const regName = /^[ \-a-zа-яё]*$/i;

/** Russian names (cyrillic letters, dashes) */
export const regNameRu = /^[-а-яё]*$/i;

/** English names (latin letters, dashes and spaces) */
export const regNameEn = /^[ \-a-z]*$/i;

/** Checking for the content of at least 1 Latin letter */
export const regOneLetter = /^(?=.*[a-z]).*$/i;

/** Checking for the content of at least 1 digit */
export const regOneDigit = /^(?=.*\d).*$/;

/** Phone number (+7(000) 000-00-00) */
export const regPhone = /^\+7\(\d{3}\) \d{3}(?:-\d{2}){2}$/;

/** Email */
export const regEmail = /^(?!.{65})([a-z0-9_\-.+]+)@([a-z0-9]+)((([.]?|[_-]{0,2})[a-z0-9]+)*)\.([a-z]{2,})$/i;

/** Accept only cyrillic letters and digits */
export const onlyRussianLettersDigits = /^[ \-0-9А-Яа-яё_]+$/u;

/** Accept only latin letters and digits */
export const onlyEnglishLettersDigits = /^[a-zA-Zz0-9_]+$/;
