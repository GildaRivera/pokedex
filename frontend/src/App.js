import logo from './logo.svg';
import './App.css';
import Navbar from './components/utils/Navbar/navbar';
import AllPokemons from './components/Pokemons/Home/AllPokemons';
import User from './components/User/user';
function App() {

  
  return (
    <>
     <Navbar />
  <AllPokemons />
    {/* <User /> */}
    
    </>
  );
}

export default App;
