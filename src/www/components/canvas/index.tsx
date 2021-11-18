import React, { useRef, useEffect } from "react";

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
    Width: number,
    Height: number,
    Layers: {
        [key: string]: string
    },
    DrawElements?: DrawElement[]
}

interface ICanvasStack {
    Ref: any,
    Element: any,
    Value: DrawElement
}

export function Canvas({ OnRender, Layers, DrawElements, Width, Height }: Props): JSX.Element {
    const canvasStack: ICanvasStack[] = [];

    useEffect(() => {
        canvasStack.forEach(e => {
            const canvas = e.Ref.current as HTMLCanvasElement;
            const context = canvas.getContext("2d");

            switch (e.Value.Type) {
                case "shape":
                    context.fillStyle = (e.Value.Extra as DrawElementShapeRect).Color;
                    context.fillRect(
                        e.Value.X,
                        e.Value.Y,
                        (e.Value.Extra as DrawElementShapeRect).Width,
                        (e.Value.Extra as DrawElementShapeRect).Height
                    );
                    break;
                case "image":
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    const img = new Image((e.Value.Extra as DrawElementImage).Width, (e.Value.Extra as DrawElementImage).Height);
                    img.src = (e.Value.Extra as DrawElementImage).Image;
                    img.crossOrigin = "anonymous";
                    img.onload = function () {
                        context.drawImage(img, e.Value.X, e.Value.Y);
                    };
                    break;
                case "text":
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    if ((e.Value.Extra as DrawElementText).Font) {
                        context.font = (e.Value.Extra as DrawElementText).Font;
                    }
                    if ((e.Value.Extra as DrawElementText).Color) {
                        context.fillStyle = (e.Value.Extra as DrawElementText).Color;
                    }

                    context.fillText((e.Value.Extra as DrawElementText).Value, e.Value.X, e.Value.Y);
                    break;
                default:
                    throw new Error("Invalid draw element type.");
            }
        });
    })

    function Render(): JSX.Element[] {
        const layersKeys = Object.keys(Layers);

        layersKeys.forEach((e, idx) => {
            const ref = useRef(null);
            canvasStack.push({
                Value: {
                    Type: "image",
                    X: 0,
                    Y: 0,
                    Id: e,
                    Extra: {
                        Image: Layers[e]
                    } as DrawElementImage
                },
                Ref: ref,
                Element: <canvas key={idx} ref={ref} width={Width} height={Height}></canvas>
            });
        });

        DrawElements.forEach((e, idx) => {
            const ref = useRef(null);
            canvasStack.push({
                Value: e,
                Ref: ref,
                Element: <canvas key={e.Id} ref={ref} width={Width} height={Height}></canvas>
            });
        });

        return canvasStack.map(a => a.Element);
    }

    return <>
        {Render()}
    </>;
}