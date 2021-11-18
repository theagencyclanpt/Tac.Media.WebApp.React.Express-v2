import React from 'react';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import Button from '@material-ui/core/Button';
import CloudUploadOutlined from '@material-ui/icons/CloudUploadOutlined';

export function ResultFormComponent() {
  const control = {
    value: 1,
    onChange: () => 1,
    exclusive: true,
  };
  return (
    <div>
      <div style={{ marginBottom: "16px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <ToggleButtonGroup size="medium" color="error" fullWidth {...control}>
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
        <TextField fullWidth label="Campeonato" variant="outlined" size="small" />
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
  )
}