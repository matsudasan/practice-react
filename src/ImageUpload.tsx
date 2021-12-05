import React, { useRef, useState } from "react";

const ImageUpload: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [url, setUrl] = useState<string | undefined>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null || e.target.files.length === 0) return
        const file = e.target.files[0]
        if (!file.type.match(/image\/*/)) {
            inputRef.current!.value = ""
            return alert('画像ファイルをアップロードして下さい。')
        }
        const imageUrl = URL.createObjectURL(file)
        setUrl(imageUrl)
    }
    return (
        <>
            <input type="file" data-testid="input" ref={inputRef} onChange={handleChange} />
            <img data-testid="img" src={url} />
        </>
    )
}

export { ImageUpload }