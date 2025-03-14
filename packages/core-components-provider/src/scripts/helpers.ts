import { en, ru } from '@ensi-platform/core-components-common';

import type i18n from './i18n';

export const addInternalTranslations = (i18nInstance: typeof i18n) => {
    i18nInstance.addResourceBundle('ru', 'translation', ru);
    i18nInstance.addResourceBundle('en', 'translation', en);
};
