import { useState } from 'react';

const Test = () => {
    const [text, setText] = useState<string>('');

    return (
        <>
            <p data-testid="text">{text}</p>
            <input  data-testid="input" onClick={value => setText(value.currentTarget.value)} />
        </>
    );
};
export default Test;
