import React, { useState } from 'react';

export type UseCounterReturnType = {
    count: number;
    increment: () => void;
    decrement: () => void
};

const useCounter = (init: number = 0) => {
    const [count, setCount] = useState(init);

    const increment = () => setCount((prevState) => prevState + 1);
    const decrement = () => setCount((prevState) => prevState - 1);

    return { count, increment, decrement };
};

export { useCounter }