import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { Loading } from "notiflix";
import { useEffect, useState } from "react";
import SavePokemon from "../../Pokemons/SavePokemons/savePokemon";

export default function PokeCard(props) {
  const [pokemon, setPokemon] = useState({ name: "", moves: [], image: "" });
  const [loader, setLoader] = useState(false);
  const style = {
    backgroundImage: `url(${pokemon.image})`,
    height: "40vh",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  };
  //Gest data of pokemon
  async function getPokeData() {
    setLoader(true);
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
    Loading.remove();
    setLoader(false);
  }
  useEffect(() => {
    getPokeData();
  }, [props]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { name, url } = props.pokemon;
  return (
    <>
      <Card sx={{ minWidth: 275, margin: "3% 0%" }}>
        <CatchingPokemonIcon color="primary" onClick={handleClickOpen} />
        {loader ? (
          <CircularProgress />
        ) : (
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
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
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
              <ListSubheader></ListSubheader>
              {pokemon.moves.map(({ move }, i) => (
                <ListItem key={i}>
                  <ListItemText primary={move.name} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        )}

        <CardActions></CardActions>
      </Card>

      {/* Opens form to save  pokemon */}
      {open ? (
        <SavePokemon open={open} pokemon={pokemon} close={handleClose} />
      ) : (
        <></>
      )}
    </>
  );
}
