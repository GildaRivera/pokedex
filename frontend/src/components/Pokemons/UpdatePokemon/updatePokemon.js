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
import { useContext, useState } from "react";
import { UserContext } from "../../../App";

export default function UpdatePokemon(props) {
  const user = useContext(UserContext); 
  const [form, setForm] = useState({
    name: props.pokemon.name,
    nickname: props.nickname,
    gender: props.gender,
    user_id: user.user.id,
    url: props.pokemon.url,
    pokemonId: props.pokemon.id,
  });

  //Adds new pokemon
  async function handleUpdate() {
    setForm((prev) => {
      prev["name"] = props.pokemon.name;
      prev["user_id"] = user.user.id;
      prev["url"] = props.pokemon.url;
      prev["pokemonId"] = props.pokemon.id;
      return prev;
    });
    console.log(form);
    Loading.circle();
    await fetch(`http://localhost:8082/api/pokemon/${props.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          Notify.success("Pokemon updated",{timeout:1000});
          return response.json();
        }
        throw new Error("Somethi ng went wrong");
      })
      .catch((err) => {
        Notify.failure("Cant update pokemon",{timeout:1000});
      });
    Loading.remove();
    props.close();
    props.onUpdate();
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
        {"Updating pokemon " + props.pokemon.name}
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
            defaultValue={props.nickname}
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
            defaultValue={props.gender}
            onChange={handleChange}
          >
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Male"}>Male</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close}>Cancel</Button>
        <Button autoFocus onClick={handleUpdate} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
