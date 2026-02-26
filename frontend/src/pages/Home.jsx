import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero-page">
      <div className="hero-card">
        <p className="hero-eyebrow">League of Legends Tracker</p>
        <h1>Busca jugadores y champions desde una sola barra</h1>
        <p>
          Usa la barra superior para elegir si quieres buscar un jugador por region
          o un champion por nombre. No hace falta escribir rutas manuales.
        </p>

        <div className="hero-actions">
          <Link className="hero-button" to="/champions">
            Ver champions
          </Link>
          <Link className="hero-button secondary" to="/player">
            Ir a players
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
