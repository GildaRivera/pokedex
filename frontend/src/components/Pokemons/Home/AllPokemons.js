import { Pagination } from "@mui/material";
import { Loading } from "notiflix";
import { useEffect, useState } from "react";
import PokeCard from "../../utils/PokemonCard/pokemonCard";
import "./allPokemons.css";
export default function AllPokemons(props) {
  let [pokeData, setPokeData] = useState([]);
  let [page, setPage] = useState({ pagination: 1, queryPagination: 1 });
  //Fetch data
  async function getPokeData() {
    Loading.dots();
    await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=100&offset=${page.queryPagination}`
    )
      .then((response) => response.json())
      .then(async function (actualData) {
    
        await setPokeData(actualData.results);
      });
  }

  useEffect(() => {
    getPokeData();
  }, [page.pagination]);
  //Changes state for the pagination
  const handleChange = (e, next) => {
    setPage((prev) => ({
      pagination: next,
      queryPagination: prev.queryPagination + 100,
    }));
  };

  return (
    <div className="pokeCard-container">
      {pokeData.map((pokemon, i) => (
        <PokeCard key={i} pokemon={pokemon} />
      ))}
      <Pagination
        count={11}
        page={page.pagination}
        color="primary"
        onChange={handleChange}
      />
    </div>
  );
}
