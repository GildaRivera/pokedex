import {
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function PokeCard(props) {
  const [pokemon, setPokemon] = useState({ name: "", moves: [], image: "" });
  const style = {
    backgroundImage: `url(${pokemon.image})`,
    height: "40vh",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  };
  //Gest data of pokemon
  async function getPokeData() {
    await fetch(url)
      .then((response) => response.json())
      .then((actualData) => {
        setPokemon((prev) => {
          return {
            name: name,
            moves: actualData.moves,
            image: actualData.sprites.other["official-artwork"].front_default,
          };
        });
      });
  }
  useEffect(() => {
    getPokeData();
  }, [props]);

  const { name, url } = props.pokemon;
  return (
    <Card sx={{ minWidth: 275, margin: "3% 0%" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       Nickname
      </Typography> */}
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
       {pokemon.gender}
      </Typography> */}
        <div style={style}></div>
        {/* <div variant="body2">
       moves{pokemon.moves.map(({move},i)=><li key={i}>{move.name}</li>)}
      </div> */}
   <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       Moves
      </Typography> 
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: "10vh",
            "& ul": { padding: 0 },
          }}
        >
       <ListSubheader>
         
       </ListSubheader>
          {pokemon.moves.map(({ move }, i) => (
         
              <ListItem key={i}>
                <ListItemText primary={move.name} />
              </ListItem>
       
          ))}
        </List>
      </CardContent>

      <CardActions></CardActions>
    </Card>
  );
}
