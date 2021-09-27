import React, { useRef } from "react";

type DrawElementType = "shape" | "image" | "text";

type DrawElementTextAlign = "center" | "rigth" | "left";

export interface DrawElementText {
    color: string,
    font: string,
    textAlign: DrawElementTextAlign,
    value: string | number,
}

export interface DrawElementImage {
    width: number,
    height: number
}

export interface DrawElementShapeRect {
    width: number,
    height: number,
    color: string,
}

export interface DrawElement {
    type: DrawElementType,
    x: number,
    y: number,
    extra: DrawElementText | DrawElementImage | DrawElementShapeRect
}

interface Props {
    OnRender: (image: string) => void,
    BackgroundImage: string,
    DrawElements?: DrawElement[]
}

export function Canvas({ OnRender, BackgroundImage, DrawElements }: Props): JSX.Element {
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


            if (DrawElements && DrawElements.length > 0) {
                DrawElements.forEach((element) => {

                    switch (element.type) {
                        case "shape":
                            context.fillStyle = (element.extra as DrawElementShapeRect).color;
                            context.fillRect(
                                element.x,
                                element.y,
                                (element.extra as DrawElementShapeRect).width,
                                (element.extra as DrawElementShapeRect).height
                            );
                            break;
                        case "image":

                            break;
                        case "text":

                            break;

                        default:
                            throw new Error("Invalid draw element type.");
                    }

                });
                context.fillStyle = "#95191B";
                context.fillRect(
                    560, 850, 300, 50
                );
            }

            OnRender(canvas.toDataURL());
        };
    });

    return <canvas style={{ display: "none" }} ref={canvasRef} />;
}