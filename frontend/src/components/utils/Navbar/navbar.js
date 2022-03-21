import Login from '@mui/icons-material/Login';
import LoginIcon from '@mui/icons-material/Login';
import {
  BottomNavigation,
  BottomNavigationAction,
  Tab,
  Tabs,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import AllPokemons from "../../Pokemons/Home/AllPokemons";
import MyPokemons from "../../Pokemons/YourPokemons/yourPokemons";
import User from "../../User/user";

export default function Navbar(props) {



    const [value, setValue] = useState(0);
const handleLogOut = ()=>{
  props.handleLogin(false)

}
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: "100%" }}>
        <Box >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            sx={{
                
              "& .MuiTabs-indicator": {
                display: "flex",
                justifyContent: "space-around",
            
              },
              "& .MuiTabs-indicatorSpan": {
                maxWidth: 40,
                width: "100%",
             
              },
              "& .MuiTabs-indicator": {
                backgroundColor:"#f3f9ff40",
           
              
               },
            }}
          >
            <Tab label="HOME"/>
            <Tab label="POKEMONS" />
            <Tab label="YOUR POKEMONS" />
            <Login
    
          sx={{ color: "red"}}
          onClick={handleLogOut}
          /> 
        
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <User />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AllPokemons />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MyPokemons />
        </TabPanel>
      </Box>
    );
  }
  
function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
