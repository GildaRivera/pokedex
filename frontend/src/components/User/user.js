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
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

export default function User(props) {
  const user = useContext(UserContext);
  const [changed, setChanged] = useState(false);
  const [update, setUpdate] = useState([]);
  const [form, setForm] = useState({
    name: user.user.name,
    nickname: user.user.nickname,
    gender: user.user.gender,
    email: user.user.email,
    region: user.user.region,
    age: user.user.age,
    trainerclass: user.user.trainerclass,
  });

  const handleUpdate = (e) => {
    setForm((prev) => {
      let newValue = e.target.value;
      prev[e.target.name] = newValue;
      return prev;
    });
  };
  async function handleSave() {
    Loading.circle();
    await fetch(`http://localhost:8082/api/user/${user.user.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          Notify.success("User info updated", { timeout: 1000 });
          return response.json();
        }
      })
      .then((actualData) => {
        setChanged(true);
        setUpdate(actualData);
      })
      .catch((err) => {
        Notify.failure("Error in updating", { timeout: 1000 });
      });
    Loading.remove();
  }
  useEffect(() => {
    if (changed) {
      user.handleLogin(true, update);
    }
    setChanged(false);
  }, [update]);

  return (
    <div>
      <div style={{ position: "relative", left: "10vw" , display:'block', top:'6vh'}}>
        <Avatar
          sx={{ bgcolor: "red", width: "140px", height: "140px" }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          <CatchingPokemon sx={{ width: "100%", height: "100%" }} />
        </Avatar>
      </div>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl>
            <TextField
              id="name"
              name="name"
              label="Name"
              defaultValue={user.user.name}
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
              defaultValue={user.user.nickname}
              variant="outlined"
              sx={{ margin: "2vh 0" }}
            />
          </FormControl>
          <div style={{ display: "flex" }}>
            <FormControl sx={{ marginRight: "1vw", width: "100%" }}>
              <TextField
                id="age"
                label="age"
                name="age"
                onChange={handleUpdate}
                type="number"
                defaultValue={user.user.age}
                variant="outlined"
                sx={{ margin: "2vh 0" }}
              />
            </FormControl>
            <FormControl sx={{ marginLeft: "1vw", width: "100%" }}>
              <TextField
                id="region"
                onChange={handleUpdate}
                label="Region"
                name="region"
                defaultValue={user.user.region}
                variant="outlined"
                sx={{ margin: "2vh 0" }}
              />
            </FormControl>
          </div>
          <div style={{ display: "flex" }}>
            <FormControl fullWidth sx={{ marginRight: "1vw" }}>
              <InputLabel>Gender</InputLabel>
              <Select
                id="gender"
                label="Gender"
                name="gender"
                defaultValue={user.user.gender}
                onChange={handleUpdate}
              >
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginLeft: "1vw" }}>
              <InputLabel>Trainer class</InputLabel>
              <Select
                label="Trainer class"
                id="trainerclass"
                defaultValue={user.user.trainerclass}
                name="trainerclass"
                onChange={handleUpdate}
              >
                <MenuItem value="Battle">Battle</MenuItem>
                <MenuItem value="Show">Show</MenuItem>
              </Select>
            </FormControl>
          </div>
          <FormControl>
            <TextField
              id="email"
              label="Email"
              name="email"
              defaultValue={user.user.email}
              onChange={handleUpdate}
              variant="outlined"
              sx={{ margin: "2vh 0" }}
            />
          </FormControl>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </Box>
      </Container>
    </div>
  );
}
