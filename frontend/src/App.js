import logo from './logo.svg';
import './App.css';
import Navbar, { BasicTabs } from './components/utils/Navbar/navbar';
import AllPokemons from './components/Pokemons/Home/AllPokemons';
import User from './components/User/user';
import MyPokemons from './components/Pokemons/YourPokemons/yourPokemons';
function App() {

  
  return (
    <>
     <Navbar />
   
  {/* <AllPokemons /> */}
    {/* <User /> */}
    {/* <MyPokemons /> */}
    </>
  );
}

export default App;
