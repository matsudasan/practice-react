import React from "react";

type Props = {
    num: number,
    str: string
}
const Sample: React.FC<Props> = ({ num, str }) => {
    return (
        <>
            <p data-testid="number">数字：{num}</p>
            <p data-testid="string">文字列：{str}</p>
        </>
    )
}

const sum = (a: number, b: number): number => {
    return a + b;
}

export { Sample, sum }