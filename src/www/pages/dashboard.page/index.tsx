import React, { useState, useRef } from 'react';
import "./styles.scss";
import { Card } from "@/ui/components/card";
import { Canvas } from "@/ui/components/canvas";
import { useHistory } from 'react-router-dom';


interface DesktopLayoutProps {
    OnPulbish: () => void,
    PreviewImg: JSX.Element,
}

function DesktopLayout({ OnPulbish, PreviewImg }: DesktopLayoutProps): JSX.Element {

    return (
        <div className="layout">
            <div className="layout-content">
                <Card className="banner-card" width={460} height={704} >
                    <button onClick={OnPulbish}>Publicar</button>
                </Card>
                <Card width={979} height={704} className="banner-card" >
                    <div className="banner-preview banner-preview__desktop">
                        {PreviewImg}
                    </div>
                </Card>
            </div>
        </div>
    );
}

export function DashboardPage(): JSX.Element {
    const [isMobile, setIsMobile] = useState(false);
    const history = useHistory();
    const previewImgRef = useRef(null);
    const previewImg = (<img ref={previewImgRef} crossOrigin="anonymous" />);

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

        history.push(resultData.result)
    }

    function onRender(image: string) {
        previewImgRef.current.src = image;
    }

    return (
        <>
            <Canvas
                OnRender={onRender}
                BackgroundImage="http://localhost:4334/banner/insta.jpg" />
            {
                isMobile ?
                    null :
                    <DesktopLayout
                        OnPulbish={onPulbish}
                        PreviewImg={previewImg}
                    />
            }
        </>
    );
}
