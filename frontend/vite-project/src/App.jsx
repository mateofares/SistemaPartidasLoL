import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [player, setPlayer] = useState(null);

  const searchPlayer = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/players/${name}`
      );
      const data = await response.json();
      setPlayer(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>LoL Stats App</h1>

      <input
        type="text"
        placeholder="Nombre del jugador"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={searchPlayer}>Buscar</button>

      {player && (
        <div>
          <h2>{player.name}</h2>
          <p>Nivel: {player.level}</p>
        </div>
      )}
    </div>
  );
}

export default App;