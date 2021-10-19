import React from 'react';
import { Card } from "@/ui/components/card";
import CardForm from "../../components/card.form/index"; //TODO
import { PreviewType } from '.';

interface DesktopLayoutProps {
    OnPulbish: () => void,
    PreviewImgElement: JSX.Element,
    PreviewType: PreviewType,
    OnChangePreviewType: (previewType: PreviewType) => void
}

export function DesktopLayout({ OnPulbish, PreviewImgElement, PreviewType, OnChangePreviewType }: DesktopLayoutProps): JSX.Element {
    const previewSettings = {
        width: PreviewType === "twitter" ? 979 : 400,
        height: 704,
        previewButtonInstagram: PreviewType === "instagram" ? "selected" : null,
        previewButtonTwitter: PreviewType === "twitter" ? "selected" : null
    };

    function OnChangePreview(previewType: PreviewType) {
        OnChangePreviewType(previewType);
    }

    return (
        <div className="layout">
            <div className="layout-content">
                <Card className="banner-card" width={460} height={704} >
                    <CardForm />
                    <button onClick={OnPulbish}>Gerar link</button>
                    <input type="text" name="" id="title" />
                </Card>
                <Card width={previewSettings.width} height={previewSettings.height} className="banner-card" >
                    <div className="banner-preview banner-preview__desktop" >
                        {PreviewImgElement}
                    </div>
                </Card>
                <div className="preview-options">
                    <Card width={60} height={60} className={"preview-option " + previewSettings.previewButtonInstagram} onClick={() => OnChangePreview("instagram")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <rect x="4" y="4" width="16" height="16" rx="4" />
                            <circle cx="12" cy="12" r="3" />
                            <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                        </svg>
                    </Card>
                    <Card width={60} height={60} className={"preview-option " + previewSettings.previewButtonTwitter} onClick={() => OnChangePreview("twitter")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
                        </svg>
                    </Card>
                </div>
            </div>
        </div>
    );
}
