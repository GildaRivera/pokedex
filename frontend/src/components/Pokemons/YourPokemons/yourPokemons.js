import { Pagination } from "@mui/material";
import { Loading } from "notiflix";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import PokeCard from "../../utils/PokemonCard/pokemonCard";
import "./allPokemons.css";
export default function MyPokemons(props) {
  const user = useContext(UserContext); 
  let [pokeData, setPokeData] = useState([]);
  let [page, setPage] = useState({ pagination: 1, queryPagination: 1 });
  //Fetch data
  async function getPokeData() {
    Loading.dots();
    await fetch(
      `http://localhost:8082/api/pokemon/user/${user.user.id}`
    )
      .then((response) => response.json())
      .then(async function (actualData) {
       await setPokeData(actualData);
      });




      
      Loading.remove()
  }

  useEffect(() => {
    getPokeData();
  }, [page.pagination]);
  const handleDelete=()=>{
   getPokeData()
  }
  //Changes state for the pagination
  const handleChange = (e, next) => {
    setPage((prev) => ({
      pagination: next,
      queryPagination: prev.queryPagination + 100,
    }));
  };

  return (
    <div className="pokeCard-container">
      {pokeData.length>0? pokeData.map((pokemon, i) => (
        <PokeCard key={i} pokemon={pokemon} mine={true} handleDelete={handleDelete}/>
      ))
    : <></>
    }
      <Pagination
        count={11}
        page={page.pagination}
        color="primary"
        onChange={handleChange}
      />
    </div>
  );
}
