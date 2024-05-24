# Компонент ActionPopup

`ActionPopup` - попап действия, используется для кейсов, где нужно согласие на удаление, дублирование и тд. Построен на попапе `Popup`. Используется вместе с хуком `usePopupState`. Чтобы закрытие казалось плавным нужно сначала закрывать через `popupDispatch({ type: ActionType.PreClose })`а после очищать весь редьюсер с помощью `popupDispatch({ type: ActionType.Close })`