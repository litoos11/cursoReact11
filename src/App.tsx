import { useEffect, useRef, useState } from "react";
import { type User } from "./types.d";
import "./App.css";
import { UsersList } from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const originalUsers = useRef<User[]>([]);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (response) => await response.json())
      .then((json) => {
        setUsers(json.results);
        originalUsers.current = json.results;
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : users;

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>

        <button onClick={toggleSortByCountry}>
          {sortByCountry ? "No ordenar por país" : "Ordenar por país"}
        </button>

        <button onClick={handleReset}>Resetea estado</button>
      </header>
      <main>
        <UsersList
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </div>
  );
}

export default App;
