import logo from './logo.svg';
import './App.css';
import Navbar from './components/utils/Navbar/navbar';
import PokeCard from './components/utils/PokemnCard/pokemonCard';
function App() {
  return (
    <>
     <Navbar />
     <div class="pokeCard-container">
     <PokeCard />
     <PokeCard />
     <PokeCard />
     <PokeCard />

     <PokeCard />
     <PokeCard />
     <PokeCard />
     <PokeCard />
    </div>
    
    
    </>
  );
}

export default App;
