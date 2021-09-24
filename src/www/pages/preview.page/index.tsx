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
            <h4>Preview para o boundle {hash}</h4>
        </>
    );
}
