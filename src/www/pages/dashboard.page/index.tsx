import React, { useState, useRef, useEffect } from 'react';
import "./styles.scss";
import { Canvas, DrawElement } from "@/ui/components/canvas";
import { DesktopLayout } from "./desktop.layout";

interface CanvasProps {
    Background: string;
    Overlay?: string;
    Font?: string;
    OnRender?: (image: string) => void;
}

export type PreviewType = "instagram" | "twitter";

type BannerConfigurationType = "instagram" | "twitter";

interface BannerConfiguration {
    Id: number;
    Type: BannerConfigurationType;
    Description: string;
    Background: string;
    Overlay: string;
    Font: string;
}

export function DashboardPage(): JSX.Element {
    const [previewType, setPreviewType] = useState<PreviewType>("instagram")
    const [drawElements, setDrawElements] = useState<DrawElement[]>([] as DrawElement[]);
    const [canvasProps, setCanvasProps] = useState<CanvasProps>();
    const previewImgRef = useRef(null);
    const previewImgElement = (<img ref={previewImgRef} crossOrigin="anonymous" />);
    const [instagramSettings, setInstagramSettings] = useState<BannerConfiguration>();
    const [twitterSettings, setTwitterSettings] = useState<BannerConfiguration>();

    useEffect(() => {
        fetch("/api/banner/group/configuration/1", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(data => {
                const result = data.result;

                setInstagramSettings(result.Instagram);
                setTwitterSettings(result.Twitter);

                setPreviewType("instagram");

                setCanvasProps({
                    Background: result.Instagram.Background,
                    Overlay: result.Instagram.Overlay,
                    Font: result.Instagram.Font,
                    OnRender: onRender
                });
            }
            );
    }, []);

    async function getPublishUrl(instagramImage: string, twitterImage: string): Promise<void> {
        if (instagramImage && twitterImage) {
            const result = await fetch("/api/banner/generate-url", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Group: {
                        InstagramImageBase64: instagramImage,
                        TwitterImageBase64: twitterImage
                    },
                    FormData: {
                        //add form data here
                        "Title": 123
                    }
                })
            });

            const resultData = await result.json();
            navigator.clipboard.writeText(window.location.origin + resultData.result)
        }
    }

    function onPublish(): void {
        setCanvasProps({
            Background: instagramSettings.Background,
            Overlay: instagramSettings.Overlay,
            Font: instagramSettings.Font,
            OnRender: (instagramImage: string) => {
                setCanvasProps({
                    Background: twitterSettings.Background,
                    Overlay: twitterSettings.Overlay,
                    Font: twitterSettings.Font,
                    OnRender: async (twitterImage: string) => {
                        await getPublishUrl(instagramImage, twitterImage);
                    }
                });
            }
        });
    }

    function onRender(image: string) {
        previewImgRef.current.src = image;
    }

    function OnChangePreviewType(previewType: PreviewType) {
        function customRender(image: string) {
            setPreviewType(previewType);
            onRender(image);
        }

        if (previewType === "instagram") {
            setCanvasProps({
                Background: instagramSettings.Background,
                Overlay: instagramSettings.Overlay,
                Font: instagramSettings.Font,
                OnRender: customRender
            });
        } else if (previewType === "twitter") {
            setCanvasProps({
                Background: twitterSettings.Background,
                Overlay: twitterSettings.Overlay,
                Font: twitterSettings.Font,
                OnRender: customRender
            });
        }
    }

    return (
        <>
            {canvasProps && <Canvas
                OnRender={canvasProps.OnRender}
                BackgroundImage={canvasProps.Background}
                DrawElements={drawElements}
            />}
            <DesktopLayout
                OnPulbish={onPublish}
                OnChangePreviewType={OnChangePreviewType}
                PreviewType={previewType}
                PreviewImgElement={previewImgElement}
            />
        </>
    );
}
