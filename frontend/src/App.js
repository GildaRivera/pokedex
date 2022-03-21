import { createContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login/login";
import Navbar from "./components/utils/Navbar/navbar";
export const UserContext = createContext();
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const handleLogin = (e, u) => {
    if (e === true) {
      setLoggedIn(true);
      window.localStorage.setItem("user", JSON.stringify(u));
      setUser(u);
      return null;
    }
    setLoggedIn(false);
    window.localStorage.clear();
  };

  useEffect(() => {
    let sesion = JSON.parse(window.localStorage.getItem("user"));
    if (sesion) {
      setUser(sesion);
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      {loggedIn ? (
        <UserContext.Provider value={{ logged: loggedIn, user: user }}>
          {" "}
          <Navbar handleLogin={handleLogin} />
        </UserContext.Provider>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
