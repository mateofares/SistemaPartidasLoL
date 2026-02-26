import { useEffect, useState } from "react";

function App() {

  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/player/get")
      .then(res => {
        if (!res.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return res.json();
      })
      .then(data => {
        setPlayers(data);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Players</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {players.length === 0 && !error && <p>Cargando...</p>}

      {players.map((player, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <p><strong>ID:</strong> {player.id}</p>
          <p><strong>Nombre:</strong> {player.nickname}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;