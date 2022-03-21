import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Loading, Notify } from "notiflix";
import { useEffect, useState } from "react";

export default function Login(props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [logged, setlogged] = useState(false);
  const [user, setUser] = useState({})
  const handleUpdate = (e) => {
    setForm((prev) => {
      let newValue = e.target.value;
      prev[e.target.name] = newValue;
      return prev;
    });
  };
  useEffect(() => {
    if (logged) {
      props.handleLogin(true, user);
    }
  }, [logged]);
  async function handleLog() {
    console.log(form);
    Loading.circle();
    await fetch(`http://localhost:8082/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          Notify.success("Logged in", {timeout:1000});
          return response.json();
        }
        throw Error;
      }).then(async function (actualData) {
        await setUser(actualData[0]);    
        setlogged(true);
      }).catch((err) => {
        Notify.failure("Error in login",{timeout:1000});
      });
    Loading.remove();
  }
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h1" component="div" gutterBottom>
          Login
        </Typography>
        <FormControl>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            sx={{ margin: "2vh 0" }}
            onChange={handleUpdate}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="password"
            name="password"
            onChange={handleUpdate}
            label="Password"
            variant="outlined"
            sx={{ margin: "2vh 0" }}
          />
        </FormControl>

        <Button onClick={handleLog} variant="outlined">
          Save
        </Button>
        <Button onClick={handleLog} variant="outlined">
          Create account
        </Button>
      </Box>
    </Container>
  );
}
