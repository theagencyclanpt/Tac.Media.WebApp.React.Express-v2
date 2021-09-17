import React, { useState } from 'react';
import "./styles.scss";
import { Card } from "@/ui/components/card";

function DesktopLayout(): JSX.Element {

    return (
        <div className="layout">
            <div className="layout-content">
                <Card className="banner-card" width={460} height={704} >
                    <div className="form-group">
                        <label> Example label</label>
                        <input type="text" className="form-control form-control-lg" placeholder="Example input" />
                    </div>
                    <div className="form-group">
                        <label> Example label</label>
                        <input type="text" className="form-control form-control-lg" placeholder="Example input" />
                    </div>
                    <div className="form-group">
                        <label> Example label</label>
                        <input type="text" className="form-control form-control-lg" placeholder="Example input" />
                    </div>
                    <div className="form-group">
                        <label> Example label</label>
                        <input type="text" className="form-control form-control-lg" placeholder="Example input" />
                    </div>
                    <div className="form-group">
                        <label> Example label</label>
                        <input type="text" className="form-control form-control-lg" placeholder="Example input" />
                    </div>
                    <div className="form-group">
                        <label> Example label</label>
                        <input type="text" className="form-control form-control-lg" placeholder="Example input" />
                    </div>
                </Card>
                <Card width={979} height={704} className="banner-card" >
                    <div className="banner-preview banner-preview__desktop">
                        <img id="preview" src="https://wallpapercave.com/wp/wp4939880.png" />
                    </div>
                </Card>
            </div>
        </div>
    );
}

export function DashboardPage(): JSX.Element {
    const [isMobile, setIsMobile] = useState(false);

    return isMobile ? null : <DesktopLayout />;
}
