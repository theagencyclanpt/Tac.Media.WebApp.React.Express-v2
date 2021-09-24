import { Card } from '@/ui/components/card';
import React from 'react';
import { useParams } from 'react-router-dom';

interface PreviewPageRequestParams {
    hash: string;
}

export function PreviewPage(): JSX.Element {
    const { hash } = useParams<PreviewPageRequestParams>();

    return (
        <>
            <h1>Test {hash}</h1>
            <h4>Preview para o grupo {hash}</h4>

            <Card width={979} height={704} className="banner-card" >
                <div className="banner-preview banner-preview__desktop">
                    <img src={"http://localhost:4334/banner/" + hash + "/twitter.png"} alt="" />
                </div>
            </Card>
        </>
    );
}
