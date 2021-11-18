import React from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadOutlined from '@material-ui/icons/CloudUploadOutlined';
import TextField from '@material-ui/core/TextField';

interface IProps {
  OnFormChange: (value: any, id: string) => void
}

export function AnnouncementFormComponent({ OnFormChange }: IProps): JSX.Element {
  const [value, setValue] = React.useState<Date | null>(new Date());

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
        <input id='Team1' type='file' hidden onChange={e => OnFormChange(URL.createObjectURL(e.target.files[0]), "team1logo")} />
        <Button onClick={() => document.getElementById('Team1').click()} color="warning" fullWidth variant="outlined" size="large" style={{ fontSize: "12px", display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF", color: "black" }}>
          <h3>Team1</h3>
          <CloudUploadOutlined />
        </Button>
        <input id='Team2' type='file' hidden onChange={e => OnFormChange(URL.createObjectURL(e.target.files[0]), "team2logo")} />
        <Button onClick={() => document.getElementById('Team2').click()} color="warning" fullWidth variant="outlined" size="large" style={{ fontSize: "12px", display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF", marginLeft: "10px", color: "black" }} >
          <h3>Team2</h3>
          <CloudUploadOutlined />
        </Button>
        <input id='liga' type='file' hidden onChange={e => OnFormChange(URL.createObjectURL(e.target.files[0]), "ligalogo")} />
        <Button onClick={() => document.getElementById('liga').click()} color="warning" fullWidth variant="outlined" size="large" style={{ fontSize: "12px", display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF", marginLeft: "10px", color: "black" }}>
          <h2>Liga</h2>
          <CloudUploadOutlined />
        </Button>
      </div>
    </div>
  )
}