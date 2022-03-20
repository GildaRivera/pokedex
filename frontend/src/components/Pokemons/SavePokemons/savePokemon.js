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
import { Loading, Notify } from "notiflix";
import { useState } from "react";

export default function SavePokemon(props) {
  const [form, setForm] = useState({
    name: props.pokemon.name,
    nickname: "",
    gender: "",
    user_id:1,
    url:"",
    pokemonId:props.pokemon.id
  });

  //Adds new pokemon
  async function handleSave() {
    Loading.circle();
    await fetch(`http://localhost:8082/api/pokemon`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          Notify.success("Pokemon added");
          return response.json();
        }
        throw new Error("Somethi ng went wrong");
      })
      .catch((err) => {
        Notify.failure("Error");
      });
    Loading.remove();
    props.close();
  }
  //Handles form change
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
        <Button autoFocus onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
