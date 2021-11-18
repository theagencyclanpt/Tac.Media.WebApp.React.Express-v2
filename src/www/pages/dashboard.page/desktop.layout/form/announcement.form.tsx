import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadOutlined from '@material-ui/icons/CloudUploadOutlined';

interface IProps {
  OnFormChange: (value: any, id: string) => void
}

export function AnnouncementFormComponent({ OnFormChange }: IProps): JSX.Element {

  return (
    <div>
      <div style={{ marginBottom: "16px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <TextField fullWidth label="Campeonato" variant="outlined" size="small" onChange={(e) => OnFormChange(e.target.value, "campeonato")} />
      </div>
      <div style={{ marginBottom: "16px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <TextField fullWidth label="Equipa 1" variant="outlined" size="small" onChange={(e) => OnFormChange(e.target.value, "team1")} />
      </div>
      <div style={{ marginBottom: "16px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <TextField fullWidth label="Equipa 2" variant="outlined" size="small" onChange={(e) => OnFormChange(e.target.value, "team2")} />
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