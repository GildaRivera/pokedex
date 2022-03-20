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
  const [pokemon, setPokemon] = useState({
    name: "",
    moves: [],
    image: "",
    id: "",
    url: "",
  });
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
            id: actualData.id,
            url: url,
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
  const handleColor = () => {
    return props.mine ? "red" : "#1976d2";
  };
  return (
    <>
      <Card sx={{ minWidth: 275, margin: "3% 0%" }}>
        <CatchingPokemonIcon
          sx={{ color: handleColor }}
          onClick={handleClickOpen}
        />
        {loader ? (
          <CircularProgress />
        ) : (
          <CardContent>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
            {props.mine ? (
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Nickname: {props.pokemon.nickname}
              </Typography>
            ) : (
              <></>
            )}
            {props.mine ? (
               <Typography
               sx={{ fontSize: 14 }}
               color="text.secondary"
               gutterBottom
             >
                Gender: {props.pokemon.gender}
              </Typography>
            ) : (
              <></>
            )}
            <div style={style}></div>
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

      {/* Opens form to save  pokemon if pokemon is not owned*/}
      {!props.mine ? (
        open ? (
          <SavePokemon open={open} pokemon={pokemon} close={handleClose} />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );
}
