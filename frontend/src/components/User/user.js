import CatchingPokemon from "@mui/icons-material/CatchingPokemon";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Loading, Notify } from "notiflix";
import { useEffect, useState } from "react";

export default function User(props) {
  const [form, setForm] = useState({
    name: "",
    nickname: "",
    gender: "",
    email: "",
    region: "",
    age: "",
    trainerclass: "",
  });
  const handleUpdate = (e) => {
    setForm((prev) => {
      let newValue = e.target.value;
      prev[e.target.name] = newValue;
      return prev;
    });
    console.log(form);
  };
  async function handleSave() {
    Loading.circle();
    await fetch(`http://localhost:8082/api/user/${2}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          Notify.success("User info updated");
          return response.json();
        }
      })
      .catch((err) => {
        Notify.failure("Error");
      });
    Loading.remove();
  }
  useEffect(() => {}, []);
  return (
    <div>
      <Avatar
        sx={{ bgcolor: "red" }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
      >
        <CatchingPokemon />
      </Avatar>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              sx={{ margin: "2vh 0" }}
              onChange={handleUpdate}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="nickname"
              name="nickname"
              onChange={handleUpdate}
              label="Nickname"
              variant="outlined"
              sx={{ margin: "2vh 0" }}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="region"
              onChange={handleUpdate}
              label="Region"
              name="region"
              variant="outlined"
              sx={{ margin: "2vh 0" }}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              id="gender"
              label="Gender"
              name="gender"
              onChange={handleUpdate}
              value={form.gender}
              defaultValue=""
            >
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <TextField
              id="age"
              label="age"
              name="age"
              onChange={handleUpdate}
              type="number"
              variant="outlined"
              sx={{ margin: "2vh 0" }}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Trainer class</InputLabel>
            <Select
              label="Trainer class"
              id="trainerclass"
              name="trainerclass"
              onChange={handleUpdate}
              value={form.trainerclass}
            >
              <MenuItem value="Battle">Battle</MenuItem>
              <MenuItem value="Show">Show</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              id="email"
              label="Email"
              name="email"
              onChange={handleUpdate}
              variant="outlined"
              sx={{ margin: "2vh 0" }}
            />
          </FormControl>
          <Button onClick={handleSave} variant="outlined">
            Save
          </Button>
        </Box>
      </Container>
    </div>
  );
}
