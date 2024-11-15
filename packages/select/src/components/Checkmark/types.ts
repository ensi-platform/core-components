import type { CSSObject } from '@emotion/react';

import type { FC, SVGProps } from 'react';

export type CheckmarkProps = {
    /**
     * Флаг, данный пункт выбран
     */
    selected?: boolean;

    /**
     * Флаг, данный пункт задизейблен
     */
    disabled?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Флаг множественного выбора
     */
    multiple?: boolean;

    /**
     * Расположение отметки
     */
    position?: 'before' | 'after';

    /**
     * Иконка выбранного пункта
     */
    icon?: FC<SVGProps<SVGSVGElement>>;

    checkboxCSS?: CSSObject;
};
