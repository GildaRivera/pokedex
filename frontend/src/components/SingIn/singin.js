import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Loading, Notify } from "notiflix";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './sigin.css'
export default function SignIn(props) {
  const [form, setForm] = useState({
    name: "",
    nickname: "",
    gender: "",
    email: "",
    region: "",
    age: "",
    trainerclass: "",
    password:""
  });
  const [logged, setlogged] = useState(false);
  const [user, setUser] = useState({});
  const handleUpdate = (e) => {
    setForm((prev) => {
      let newValue = e.target.value;
      prev[e.target.name] = newValue;
      return prev;
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (logged) {
      props.handleLogin(true, user);
      navigate("/");
    }
  }, [logged]);
  async function handleCreate() {
    Loading.circle();
    await fetch(`http://localhost:8082/api/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          Notify.success("Account created", { timeout: 1000 });
          return response.json();
        }
        throw Error;
      })
      .then(async function (actualData) {
        setUser(actualData);

        setlogged(true);
      })
      .catch((err) => {
        Notify.failure("Could not create account", { timeout: 1000 });
      });
    Loading.remove();
  }
  return (<div className="signin__container">
    <Container maxWidth="sm"  sx={{position:'relative', top:'10vh'}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" component="div" gutterBottom sx={{textAlign:"center", color:'#E64545'}}>
          Create account
        </Typography>
        <FormControl>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            sx={{ margin: "2vh 0" }}
            onChange={handleUpdate}
            required
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
            required
          />
        </FormControl>
        <div className="signin__element" >
        <FormControl sx={{marginRight:'1vw', width:'100%'}}>
          <TextField
            id="region"
            onChange={handleUpdate}
            label="Region"
            name="region"
            variant="outlined"
            sx={{ margin: "2vh 0" }}
            required
          />
        </FormControl>
        <FormControl sx={{marginLeft:'1vw', width:'100%'}}>
          <TextField
            id="age"
            label="age"
            name="age"
            onChange={handleUpdate}
            type="number"
            variant="outlined"
            sx={{ margin: "2vh 0" }}
            required
          />
        </FormControl></div>
        <FormControl>
          <TextField
            id="email"
            label="Email"
            name="email"
            onChange={handleUpdate}
            variant="outlined"
            sx={{ margin: "2vh 0" }}
            required
          /> 
        </FormControl>
        <FormControl>
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            sx={{ margin: "2vh 0" }}
            onChange={handleUpdate}
            required
          />
        </FormControl>
        <div className="signin__element">
        <FormControl fullWidth sx={{marginRight:'1vw'}}>
          <InputLabel>Gender</InputLabel>
          <Select
            id="gender"
            label="Gender"
            name="gender"
            onChange={handleUpdate}
            required
            defaultValue=""
          >
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
          </Select>
        </FormControl>

      
        <FormControl fullWidth sx={{marginLeft:'1vw'}}>
          <InputLabel>Trainer class</InputLabel>
          <Select
            label="Trainer class"
            id="trainerclass"
            name="trainerclass"
            onChange={handleUpdate}
            required
          >
            <MenuItem value="Battle">Battle</MenuItem>
            <MenuItem value="Show">Show</MenuItem>
          </Select>
        </FormControl></div>


        <Button onClick={handleCreate} variant="contained"  sx={{margin:'2vh 0'}}>
          Create
        </Button>
      </Box>
    </Container></div>
  );
}
