import "./style.scss";
import { Card } from '@/ui/components/card';
import React from 'react';
import { useParams } from 'react-router-dom';

interface PreviewPageRequestParams {
    hash: string;
}

export function PreviewPage(): JSX.Element {
    const { hash } = useParams<PreviewPageRequestParams>();

    return (
        <div className="layout">
            <Card width={979} height={704} className="banner-card" >
                <div className="banner-preview banner-preview__desktop">
                    <img src={"/temp/banners/" + hash + "/twitter.png"} alt="" />
                    <button>Download</button>
                </div>
            </Card>
            <Card width={400} height={704} className="banner-card" >
                <div className="banner-preview banner-preview__desktop">
                    <img src={"/temp/banners/" + hash + "/instagram.png"} alt="" />
                    <button>Download</button>
                </div>
            </Card>
        </div>
    );
}
