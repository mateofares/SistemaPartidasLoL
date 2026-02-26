import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import playerService from "../services/player.api";

function PlayerDetail() {
  const [searchParams] = useSearchParams();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nickname = searchParams.get("nickname");
  const region = searchParams.get("region");

  useEffect(() => {
    if (!nickname || !region) {
      setPlayers([]);
      return;
    }

    setLoading(true);
    setError("");

    playerService
      .getByFilters({ nickname, region })
      .then((response) => {
        setPlayers(response.data ?? []);
      })
      .catch(() => {
        setError("No se pudo obtener el jugador. Verifico nombre y region.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [nickname, region]);

  return (
    <section>
      <h1>Detalle del jugador</h1>
      <p className="page-subtitle">
        {nickname && region
          ? `Busqueda: ${nickname} (${region})`
          : "Uso la barra superior para buscar un jugador"}
      </p>

      {!nickname || !region ? (
        <p className="empty-state">Ingreso un nickname y una region para comenzar.</p>
      ) : null}

      {loading ? <p className="empty-state">Cargando jugadores...</p> : null}
      {error ? <p className="error-state">{error}</p> : null}

      {!loading && !error ? (
        <div className="grid-cards">
          {players.length > 0 ? (
            players.map((player) => (
              <article key={player.id ?? `${player.nickname}-${player.region}`} className="player-card">
                <h2>{player.nickname}</h2>
                <p>
                  <strong>Region:</strong> {player.region}
                </p>
                <p>
                  <strong>Level:</strong> {player.level}
                </p>
                <p>
                  <strong>Elo:</strong> {player.elo}
                </p>
              </article>
            ))
          ) : (
            <p className="empty-state">No hay jugadores con ese filtro.</p>
          )}
        </div>
      ) : null}
    </section>
  );
}

export default PlayerDetail;
