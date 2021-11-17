import React, { useRef } from "react";

type DrawElementType = "shape" | "image" | "text";

type DrawElementTextAlign = "center" | "rigth" | "left";

export interface DrawElementText {
    Color: string,
    Font: string,
    TextAlign: DrawElementTextAlign,
    Value: string,
}

export interface DrawElementImage {
    Width: number,
    Height: number,
    Image: string,
}

export interface DrawElementShapeRect {
    Width: number,
    Height: number,
    Color: string,
}

export interface DrawElement {
    Id: string;
    Type: DrawElementType,
    X: number,
    Y: number,
    Extra: DrawElementText | DrawElementImage | DrawElementShapeRect
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

            console.log(DrawElements);

            if (DrawElements && DrawElements.length > 0) {
                DrawElements.forEach((element) => {

                    switch (element.Type) {
                        case "shape":
                            context.fillStyle = (element.Extra as DrawElementShapeRect).Color;
                            context.fillRect(
                                element.X,
                                element.Y,
                                (element.Extra as DrawElementShapeRect).Width,
                                (element.Extra as DrawElementShapeRect).Height
                            );
                            break;
                        case "image":

                            break;
                        case "text":
                            if ((element.Extra as DrawElementText).Font) {
                                context.font = (element.Extra as DrawElementText).Font;
                            }
                            if ((element.Extra as DrawElementText).Color) {
                                context.fillStyle = (element.Extra as DrawElementText).Color;
                            }

                            context.fillText((element.Extra as DrawElementText).Value, element.X, element.Y);
                            break;

                        default:
                            throw new Error("Invalid draw element type.");
                    }

                });
            }

            OnRender(canvas.toDataURL());
        };
    });

    return <canvas style={{ display: "none" }} ref={canvasRef} />;
}