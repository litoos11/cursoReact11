import { useEffect, useState } from "react";
import { type User } from "./types.d";
import "./App.css";
import { UsersList } from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (response) => await response.json())
      .then((json) => setUsers(json.results))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
      </header>
      <main>
        <UsersList showColors={showColors} users={users} />
      </main>
    </div>
  );
}

export default App;
