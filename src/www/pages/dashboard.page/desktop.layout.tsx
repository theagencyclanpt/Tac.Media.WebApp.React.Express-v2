import React, { useState } from 'react';
import { Card } from "@/ui/components/card";
import { PreviewType } from '.';

interface DesktopLayoutProps {
    OnPulbish: () => void,
    PreviewImgElement: JSX.Element,
    PreviewType: PreviewType
}

export function DesktopLayout({ OnPulbish, PreviewImgElement, PreviewType }: DesktopLayoutProps): JSX.Element {
    const previewSettings = {
        width: PreviewType === "twitter" ? 979 : 400,
        height: 704,
    };

    function OnClickImage() {
        alert("clickec");
    }

    return (
        <div className="layout">
            <div className="layout-content">
                <Card className="banner-card" width={460} height={704} >
                    <button onClick={OnPulbish}>Publicar</button>
                </Card>
                <Card width={previewSettings.width} height={previewSettings.height} className="banner-card" >
                    <div className="banner-preview banner-preview__desktop" onClick={OnClickImage}>
                        {PreviewImgElement}
                    </div>
                </Card>
            </div >
        </div >
    );
}
