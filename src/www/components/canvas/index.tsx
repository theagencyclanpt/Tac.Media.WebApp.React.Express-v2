import React, { useRef } from "react";

interface Props {
    OnRender: (image: string) => void,
    BackgroundImage: string,
}

export function Canvas({ OnRender, BackgroundImage }: Props): JSX.Element {
    const canvasRef = useRef(null);

    React.useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const context = canvas.getContext("2d");

        const backgroundImageElement = new Image();
        backgroundImageElement.src = BackgroundImage;
        backgroundImageElement.crossOrigin = "anonymous";

        backgroundImageElement.onload = function () {
            canvas.width = backgroundImageElement.width;
            canvas.height = backgroundImageElement.height;

            context.drawImage(backgroundImageElement, 0, 0);
            OnRender(canvas.toDataURL());
        };
    });

    return <canvas style={{ display: "none" }} ref={canvasRef} />;
}