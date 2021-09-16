import React from 'react';
import "./styles.scss";
import { Card } from "@/client/components/card";

export function DashboardPage() {
    return (
        <div className="layout">
            <div className="layout-content">
                <Card className="generate_banner__options" width={460} heigth={704} >
                    <div className="form-group">
                        <label> Example label</label>
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input" />
                    </div>
                </Card>
                <Card width={979} heigth={704} className="generate_banner__options" >
                    <h1>Preview</h1>
                </Card>
                {/* <Card width={56} heigth={59} className="generate_banner__options">
                    <h1>.</h1>
                </Card>
                <Card width={56} heigth={59} className="generate_banner__options">
                    <h1>.</h1>
                </Card> */}
            </div>
        </div>
    );
}
