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

    return (
        <div className="layout">
            <div className="layout-content">
                <h1>AA {previewSettings.width}</h1>
                <Card className="banner-card" width={460} height={704} >
                    <button onClick={OnPulbish}>Publicar</button>
                </Card>
                <Card width={previewSettings.width} height={previewSettings.height} className="banner-card" >
                    <div className="banner-preview banner-preview__desktop">
                        {PreviewImgElement}
                    </div>
                </Card>
            </div>
        </div>
    );
}
