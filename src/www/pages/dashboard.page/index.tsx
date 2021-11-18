import React, { useState, useEffect, useRef } from 'react';
import "./styles.scss";
import { Canvas, DrawElement, DrawElementText } from "@/ui/components/canvas";
import { DesktopLayout } from "./desktop.layout";

export type PreviewType = "instagram" | "twitter";

export type BannerType = "announcement" | "result";

interface BannerConfiguration {
    Layers: {
        [key: string]: string
    };
    Fields: DrawElement[]
}

export function DashboardPage(): JSX.Element {
    const [previewType, setPreviewType] = useState<PreviewType>("twitter")
    const [bannerType, setBannerType] = useState<BannerType>("announcement")
    const [instagramDrawElements, setinstagramDrawElements] = useState<DrawElement[]>();
    const [twitterDrawElements, setTwitterDrawElements] = useState<DrawElement[]>();
    const [instragramConfig, setInstragramConfig] = useState<BannerConfiguration>();
    const [twitterConfig, setTwitterConfig] = useState<BannerConfiguration>();
    const canvasTwitterRef = useRef(null);
    const canvasInstagramRef = useRef(null);

    useEffect(() => {
        const bannerTypeUrl = bannerType == "announcement" ? "1" : "2";

        fetch("/api/banner/group/configuration/" + bannerTypeUrl, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(r => r.json())
            .then(data => {
                const result = data.result;
                setInstragramConfig(result.Instagram);
                setTwitterConfig(result.Twitter);
                setinstagramDrawElements(result.Instagram.Fields);
                setTwitterDrawElements(result.Twitter.Fields);
            }
            );
    }, []);

    function changeBannerType(value: BannerType) {
        setBannerType(value);

        // const bannerTypeUrl = bannerType == "announcement" ? "1" : "2";

        // fetch("/api/banner/group/configuration/" + bannerTypeUrl, {
        //     method: "GET",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(r => r.json())
        //     .then(data => {
        //         const result = data.result;
        //         setinstagramDrawElements(result.Instagram.Fields);
        //         setTwitterDrawElements(result.Twitter.Fields);
        //         setInstragramConfig(result.Instagram);
        //         setTwitterConfig(result.Twitter);

        //     }
        //     );
    }

    async function getPublishUrl(): Promise<void> {
        const instagramImage = await canvasInstagramRef.current.RenderFinallyResult();
        const twitterImage = await canvasTwitterRef.current.RenderFinallyResult();

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

    function onChangePreviewType(previewType: PreviewType) {
        setPreviewType(previewType);
    }

    function onFormChange(value: any, id: string) {

        changeInstagramDrawElement(value, id);
        changeTwitterDrawElement(value, id);
    }

    function changeInstagramDrawElement(value: any, id: string) {
        const index = instagramDrawElements.findIndex(e => e.Id === id);
        const oldState = [...instagramDrawElements];

        if (index === -1)
            return;

        switch (instagramDrawElements[index].Type) {
            case "text":
                (oldState[index].Extra as DrawElementText).Value = value;
                break;

            default:
                break;
        }
        setinstagramDrawElements(oldState);
    }

    function changeTwitterDrawElement(value: any, id: string) {
        const index = twitterDrawElements.findIndex(e => e.Id === id);
        const oldState = [...twitterDrawElements];

        if (index === -1)
            return;

        switch (twitterDrawElements[index].Type) {
            case "text":
                (oldState[index].Extra as DrawElementText).Value = value;
                break;

            default:
                break;
        }

        setTwitterDrawElements(oldState);
    }

    return (
        <>
            <DesktopLayout
                BannerType={bannerType}
                ChangeBannerType={changeBannerType}
                OnPulbish={getPublishUrl}
                OnChangePreviewType={onChangePreviewType}
                PreviewType={previewType}
                PreviewInstagram={(): JSX.Element => {
                    return instagramDrawElements && <Canvas
                        ref={canvasInstagramRef}
                        Height={1920}
                        Width={1080}
                        Layers={instragramConfig.Layers}
                        DrawElements={instagramDrawElements}
                    />
                }}
                PreviewTwitter={(): JSX.Element => {
                    return twitterDrawElements && <Canvas
                        ref={canvasTwitterRef}
                        Height={1080}
                        Width={1920}
                        Layers={twitterConfig.Layers}
                        DrawElements={twitterDrawElements}
                    />
                }}
                OnFormChange={onFormChange}
            />
        </>
    );
}
