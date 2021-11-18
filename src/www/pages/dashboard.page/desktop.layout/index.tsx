import React from 'react';
import { Card } from "@/ui/components/card";
import { PreviewType } from '..';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import Button from '@material-ui/core/Button';

interface DesktopLayoutProps {
  OnPulbish: () => void,
  PreviewInstagram: () => JSX.Element,
  PreviewTwitter: () => JSX.Element,
  PreviewType: PreviewType,
  OnChangePreviewType: (previewType: PreviewType) => void
  OnFormChange: (value: any, id: string) => void
}

export function DesktopLayout({ OnPulbish, PreviewInstagram, PreviewTwitter, PreviewType, OnChangePreviewType, OnFormChange }: DesktopLayoutProps): JSX.Element {

  const previewSettings = {
    previewButtonInstagram: PreviewType === "instagram" ? "selected" : null,
    previewButtonTwitter: PreviewType === "twitter" ? "selected" : null,
    instagram: {
      width: 400,
      height: 704
    },
    twitter: {
      width: 979,
      height: 580
    }
  };

  const [alignment, setAlignment] = React.useState('resultado');

  function handleChange(event: any, newAlignment: any) {
    setAlignment(newAlignment);
  }

  function OnChangePreview(previewType: PreviewType) {
    OnChangePreviewType(previewType);
  }

  return (
    <div className="layout">

      <div className="banner-configuration-side__bar">
        <div style={{ marginBottom: "30px" }}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="resultado">Resultado</ToggleButton>
            <ToggleButton value="anuncio">Anuncio</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <TextField label="Campeonato" variant="outlined" size="small" onChange={(e) => OnFormChange(e.target.value, "lol")} />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <TextField label="Campeonato" variant="outlined" size="small" />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <TextField label="Campeonato" variant="outlined" size="small" />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <TextField label="Campeonato" variant="outlined" size="small" />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <TextField label="Campeonato" variant="outlined" size="small" />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <TextField label="Campeonato" variant="outlined" size="small" />
        </div>
        <div style={{ marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
          <Button style={{ backgroundColor: "rgb(0, 171, 85)", boxShadow: "rgb(0 171 85 / 24%) 0px 8px 16px 0px", color: "white" }}>Download</Button>
          <Button style={{ backgroundColor: "rgb(0, 171, 85)", boxShadow: "rgb(0 171 85 / 24%) 0px 8px 16px 0px", color: "white" }}>Publish</Button>
        </div>
      </div>
      <div className="preview-options">
        <div>
          <Card width={60} height={60} className={"preview-option " + previewSettings.previewButtonInstagram} onClick={() => OnChangePreview("instagram")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="4" y="4" width="16" height="16" rx="4" />
              <circle cx="12" cy="12" r="3" />
              <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
            </svg>
          </Card>
          <Card width={60} height={60} className={"preview-option " + previewSettings.previewButtonTwitter} onClick={() => OnChangePreview("twitter")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
            </svg>
          </Card>
        </div>
      </div>

      <div className="layout-content">
        <Card width={previewSettings.instagram.width} height={previewSettings.instagram.height} className="banner-card" isHidden={PreviewType === "twitter"}>
          <div className="banner-preview banner-preview__desktop" >
            {PreviewInstagram()}
          </div>
        </Card>
        <Card width={previewSettings.twitter.width} height={previewSettings.twitter.height} className="banner-card" isHidden={PreviewType === "instagram"}>
          <div className="banner-preview banner-preview__desktop" >
            {PreviewTwitter()}
          </div>
        </Card>
      </div>
    </div>
  );
}
