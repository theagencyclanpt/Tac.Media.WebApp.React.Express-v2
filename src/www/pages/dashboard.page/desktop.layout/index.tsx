import React from 'react';
import { Card } from "@/ui/components/card";
import { PreviewType } from '..';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import Button from '@material-ui/core/Button';
import CloudUploadOutlined from '@material-ui/icons/CloudUploadOutlined';

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

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <div className="layout">

      <div className="banner-configuration-side__bar">
        <div style={{ marginBottom: "30px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <ToggleButtonGroup
            fullWidth
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="resultado">Resultado</ToggleButton>
            <ToggleButton value="anuncio">Anuncio</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div>
          <div style={{ marginBottom: "16px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <ToggleButtonGroup size="medium" fullWidth {...control}>
              <ToggleButton value="left" key="left">
                <h1>Vitória</h1>
              </ToggleButton>,
              <ToggleButton value="center" key="center">
                <h1>Empate</h1>
              </ToggleButton>,
              <ToggleButton value="right" key="right">
                <h1>Derrota</h1>
              </ToggleButton>,
            </ToggleButtonGroup>
          </div>
          <div style={{ marginBottom: "16px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <TextField fullWidth label="Campeonato" variant="outlined" size="small" onChange={(e) => OnFormChange(e.target.value, "lol")} />
          </div>
          <div style={{ marginBottom: "16px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <TextField label="Equipa 1" variant="outlined" size="small" />
            <TextField label="Score" variant="outlined" size="small" style={{ width: "95px", marginLeft: "10px" }} />
          </div>
          <div style={{ marginBottom: "16px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <TextField label="Equipa 2" variant="outlined" size="small" />
            <TextField label="Score" variant="outlined" size="small" style={{ width: "95px", marginLeft: "10px" }} />
          </div>
          <div style={{ marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
            <Button color="warning" fullWidth variant="outlined" size="large" style={{ fontSize: "12px", display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF", color: "black" }}>
              <h3>Team1</h3>
              <CloudUploadOutlined />
            </Button>
            <Button color="warning" fullWidth variant="outlined" size="large" style={{ fontSize: "12px", display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF", marginLeft: "10px", color: "black" }} >
              <h3>Team2</h3>
              <CloudUploadOutlined />
            </Button>
            <Button color="warning" fullWidth variant="outlined" size="large" style={{ fontSize: "12px", display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF", marginLeft: "10px", color: "black" }}>
              <h2>Liga</h2>
              <CloudUploadOutlined />
            </Button>
          </div>
        </div>
        <div style={{ marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
          <Button fullWidth size="large" variant="contained" color="error">Download</Button>
          <Button fullWidth size="large" variant="contained" color="error" style={{ marginLeft: "10px" }} onClick={OnPulbish}>Publish</Button>
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
