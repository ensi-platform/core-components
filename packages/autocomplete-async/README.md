# Компонент autocomplete-async

Автокомплит с поиском на стороне бэкенда. Требует два эндпоинта:

1) непосредственно поиск (с постраничной навигацией)

2) эндпоинт для получения массива вида `{ label: string; value: any}[]` по массиву значений `value[]`

Может быть представлен как единичным, так и множественным выбором.

На основе [Альфа Банк Core components](https://core-ds.github.io/core-components/master/?path=/docs/%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B-select--select)