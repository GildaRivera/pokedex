import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function SavePokemon(props) {
  const [form, setForm] = useState({
    name: props.pokemon.name,
    nickname: "",
    gender: "",
  });
  const handleValid=(e)=>{
    console.log(e)
  }
  const handleSave=()=>{
    
  }
  const handleChange = (e) => {
    setForm((prev) => {
      let newValue = e.target.value;
      prev[e.target.name] = newValue;
      return prev;
    });
   
  };
  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogTitle id="alert-dialog-title">
        {"Catching pokemon " + props.pokemon.name}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <DialogContentText id="alert-dialog-description"></DialogContentText>
        <FormControl>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            disabled={true}
            defaultValue={props.pokemon.name}
            onChange={handleChange}
            sx={{ margin: "2vh 0" }}
          />
        </FormControl>
        <FormControl>
          <TextField
             id="nickname"
             name="nickname"
            label="Nickname"
            variant="outlined"
            onChange={handleChange}
            sx={{ margin: "2vh 0" }}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select     
          id="gender"
              label="Gender"
              name="gender"
              value=""
              onChange={handleChange}
              >
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Male"}>Male</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close}>Cancel</Button>
        <Button autoFocus onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
