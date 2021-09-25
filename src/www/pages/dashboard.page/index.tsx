import React, { useState, useRef, useEffect } from 'react';
import "./styles.scss";
import { Canvas, DrawElement } from "@/ui/components/canvas";
import { DesktopLayout } from "./desktop.layout";

interface CanvasProps {
    Background: string;
    Overlay?: string;
    Font?: string;
}

export type PreviewType = "instagram" | "twitter";

export function DashboardPage(): JSX.Element {
    const [previewType, setPreviewType] = useState<PreviewType>("instagram")
    const [drawElements, setDrawElements] = useState<DrawElement[]>([] as DrawElement[]);
    const [canvasProps, setCanvasProps] = useState<CanvasProps>();
    const previewImgRef = useRef(null);
    const previewImg = (<img ref={previewImgRef} crossOrigin="anonymous" />);

    useEffect(() => {
        fetch("/api/banner/configurationById?id=1", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(data => {
                const result = data.result;

                setPreviewType(result.Type);

                setCanvasProps({
                    Background: result.Background,
                    Overlay: result.Overlay,
                    Font: result.Font
                });
            }
            );
    }, []);


    async function onPulbish(): Promise<void> {
        const result = await fetch("/api/banner/generate-url", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Group: {
                    TwitterImageBase64: previewImgRef.current.src
                }
            })
        });

        const resultData = await result.json();
        alert(resultData.result);
    }

    function onRender(image: string) {
        previewImgRef.current.src = image;
    }

    return (
        <>
            {canvasProps && <Canvas
                OnRender={onRender}
                BackgroundImage={canvasProps.Background}
                DrawElements={drawElements}
            />}
            <DesktopLayout
                OnPulbish={onPulbish}
                PreviewType={previewType}
                PreviewImgElement={previewImg}
            />
        </>
    );
}
