import { BottomNavigation, BottomNavigationAction } from "@mui/material";

export default function Navbar(props){
return <BottomNavigation showLabels sx={{justifyContent:'space-around'}}>
<BottomNavigationAction label="HOME"  />
<BottomNavigationAction label="POKEMONS"  />
<BottomNavigationAction label="YOUR POKEMONS" />
</BottomNavigation>
}
