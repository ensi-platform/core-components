import { useState } from 'react';

const Test = () => {
    const [text, setText] = useState<string>('');

    return (
        <>
            <p data-testid="text">{text}</p>
            <input data-testid="input" />
            <input type="button" onClick={value => setText(value.currentTarget.value)} value="Отправить" />
        </>
    );
};
export default Test;
