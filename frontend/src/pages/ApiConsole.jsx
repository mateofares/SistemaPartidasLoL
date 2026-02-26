import { useState } from "react";
import playerService from "../features/players/services/player.api";
import championService from "../services/champion.api";
import matchService from "../services/match.api";

const splitCsv = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

function ApiConsole() {
  const participationExample =
    '[{"playerId":1,"ChampionId":2,"role":"TOP","teamSide":"Blue_Side"}]';

  const [playerFilters, setPlayerFilters] = useState({
    id: "",
    nickname: "",
    region: "",
    level: "",
    elo: "",
  });
  const [playerResults, setPlayerResults] = useState([]);
  const [playerCreate, setPlayerCreate] = useState({
    id: "",
    nickname: "",
    region: "",
    level: "",
    elo: "",
  });
  const [playerUpdate, setPlayerUpdate] = useState({
    id: "",
    nickname: "",
    region: "",
    level: "",
    elo: "",
  });
  const [playerDeleteId, setPlayerDeleteId] = useState("");

  const [championFilters, setChampionFilters] = useState({
    name: "",
    role: "",
    difficulty: "",
  });
  const [championResults, setChampionResults] = useState([]);
  const [championCreate, setChampionCreate] = useState({
    id: "",
    name: "",
    description: "",
    difficulty: "",
    roles: "",
    typeDamages: "",
  });
  const [championDeleteId, setChampionDeleteId] = useState("");

  const [matchFilters, setMatchFilters] = useState({
    matchId: "",
    date: "",
  });
  const [matchResults, setMatchResults] = useState([]);
  const [matchCreate, setMatchCreate] = useState({
    date: "",
    teamWinner: "",
    participations: "[]",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const clearStatus = () => {
    setMessage("");
    setError("");
  };

  const handlePlayerGet = async (event) => {
    event.preventDefault();
    clearStatus();
    try {
      const response = await playerService.getByFilters({
        id: playerFilters.id || undefined,
        nickname: playerFilters.nickname || undefined,
        region: playerFilters.region.trim().toUpperCase() || undefined,
        level: playerFilters.level || undefined,
        elo: playerFilters.elo.trim().toUpperCase() || undefined,
      });
      setPlayerResults(response.data ?? []);
      setMessage("Player GET ejecutado.");
    } catch (err) {
      setError(err?.response?.data?.message ?? "Error en /player/get");
    }
  };

  const handlePlayerAdd = async (event) => {
    event.preventDefault();
    clearStatus();
    try {
      await playerService.add({
        id: playerCreate.id || undefined,
        nickname: playerCreate.nickname,
        region: playerCreate.region.trim().toUpperCase(),
        level: playerCreate.level,
        elo: playerCreate.elo.trim().toUpperCase(),
      });
      setMessage("Player creado.");
    } catch (err) {
      setError(err?.response?.data?.message ?? "Error en /player/add");
    }
  };

  const handlePlayerUpdate = async (event) => {
    event.preventDefault();
    clearStatus();
    try {
      await playerService.update({
        id: playerUpdate.id,
        nickname: playerUpdate.nickname || undefined,
        region: playerUpdate.region.trim().toUpperCase() || undefined,
        level: playerUpdate.level || undefined,
        elo: playerUpdate.elo.trim().toUpperCase() || undefined,
      });
      setMessage("Player actualizado.");
    } catch (err) {
      setError(err?.response?.data?.message ?? "Error en /player/update");
    }
  };

  const handlePlayerDelete = async (event) => {
    event.preventDefault();
    clearStatus();
    try {
      await playerService.remove(playerDeleteId);
      setMessage("Player eliminado.");
    } catch (err) {
      setError(err?.response?.data?.message ?? "Error en /player/delete");
    }
  };

  const handleChampionGet = async (event) => {
    event.preventDefault();
    clearStatus();
    try {
      const response = await championService.getByFilters({
        name: championFilters.name || undefined,
        role: championFilters.role.trim().toUpperCase() || undefined,
        difficulty:
          championFilters.difficulty.trim().toUpperCase() || undefined,
      });
      setChampionResults(response.data ?? []);
      setMessage("Champion GET ejecutado.");
    } catch (err) {
      setError(err?.response?.data?.message ?? "Error en /champion/all");
    }
  };

  const handleChampionAdd = async (event) => {
    event.preventDefault();
    clearStatus();
    try {
      await championService.add({
        id: championCreate.id || undefined,
        name: championCreate.name,
        description: championCreate.description,
        difficulty: championCreate.difficulty.trim().toUpperCase(),
        roles: splitCsv(championCreate.roles).map((item) => item.toUpperCase()),
        typeDamages: splitCsv(championCreate.typeDamages).map((item) =>
          item.toUpperCase(),
        ),
      });
      setMessage("Champion creado.");
    } catch (err) {
      setError(err?.response?.data?.message ?? "Error en /champion/add");
    }
  };

  const handleChampionDelete = async (event) => {
    event.preventDefault();
    clearStatus();
    try {
      await championService.remove(championDeleteId);
      setMessage("Champion eliminado.");
    } catch (err) {
      setError(err?.response?.data?.message ?? "Error en /champion/delete");
    }
  };

  const handleMatchGet = async (event) => {
    event.preventDefault();
    clearStatus();
    try {
      const response = await matchService.getByFilters({
        matchId: matchFilters.matchId || undefined,
        date: matchFilters.date || undefined,
      });
      setMatchResults(response.data ?? []);
      setMessage("Match GET ejecutado.");
    } catch (err) {
      setError(err?.response?.data?.message ?? "Error en /match/get");
    }
  };

  const handleMatchAdd = async (event) => {
    event.preventDefault();
    clearStatus();
    try {
      const parsedParticipations = JSON.parse(matchCreate.participations);
      await matchService.add({
        date: matchCreate.date,
        teamWinner: matchCreate.teamWinner,
        participations: parsedParticipations,
      });
      setMessage("Match creado.");
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("JSON invalido en participations.");
        return;
      }
      setError(err?.response?.data?.message ?? "Error en /match/add");
    }
  };

  return (
    <section className="console-page">
      <h1>Gestion de Endpoints</h1>
      <p className="page-subtitle">
        Panel frontend para consumir todos los endpoints actuales del backend.
      </p>

      {message ? <p className="success-state">{message}</p> : null}
      {error ? <p className="error-state">{error}</p> : null}

      <div className="console-grid">
        <article className="console-card">
          <h2>Player - GET</h2>
          <form className="console-form" onSubmit={handlePlayerGet}>
            <input
              placeholder="id"
              value={playerFilters.id}
              onChange={(e) =>
                setPlayerFilters((prev) => ({ ...prev, id: e.target.value }))
              }
            />
            <input
              placeholder="nickname"
              value={playerFilters.nickname}
              onChange={(e) =>
                setPlayerFilters((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }))
              }
            />
            <input
              placeholder="region (LAS)"
              value={playerFilters.region}
              onChange={(e) =>
                setPlayerFilters((prev) => ({
                  ...prev,
                  region: e.target.value,
                }))
              }
            />
            <input
              placeholder="level"
              value={playerFilters.level}
              onChange={(e) =>
                setPlayerFilters((prev) => ({ ...prev, level: e.target.value }))
              }
            />
            <input
              placeholder="elo (GOLD)"
              value={playerFilters.elo}
              onChange={(e) =>
                setPlayerFilters((prev) => ({ ...prev, elo: e.target.value }))
              }
            />
            <button type="submit">Consultar</button>
          </form>
          <pre className="console-output">
            {JSON.stringify(playerResults, null, 2)}
          </pre>
        </article>

        <article className="console-card">
          <h2>Player - POST / PATCH / DELETE</h2>
          <form className="console-form" onSubmit={handlePlayerAdd}>
            <input
              placeholder="id (opcional)"
              value={playerCreate.id}
              onChange={(e) =>
                setPlayerCreate((prev) => ({ ...prev, id: e.target.value }))
              }
            />
            <input
              placeholder="nickname"
              value={playerCreate.nickname}
              onChange={(e) =>
                setPlayerCreate((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }))
              }
            />
            <input
              placeholder="region (LAS)"
              value={playerCreate.region}
              onChange={(e) =>
                setPlayerCreate((prev) => ({ ...prev, region: e.target.value }))
              }
            />
            <input
              placeholder="level"
              value={playerCreate.level}
              onChange={(e) =>
                setPlayerCreate((prev) => ({ ...prev, level: e.target.value }))
              }
            />
            <input
              placeholder="elo (GOLD)"
              value={playerCreate.elo}
              onChange={(e) =>
                setPlayerCreate((prev) => ({ ...prev, elo: e.target.value }))
              }
            />
            <button type="submit">Agregar Player</button>
          </form>

          <form className="console-form" onSubmit={handlePlayerUpdate}>
            <input
              placeholder="id obligatorio"
              value={playerUpdate.id}
              onChange={(e) =>
                setPlayerUpdate((prev) => ({ ...prev, id: e.target.value }))
              }
            />
            <input
              placeholder="nickname"
              value={playerUpdate.nickname}
              onChange={(e) =>
                setPlayerUpdate((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }))
              }
            />
            <input
              placeholder="region"
              value={playerUpdate.region}
              onChange={(e) =>
                setPlayerUpdate((prev) => ({ ...prev, region: e.target.value }))
              }
            />
            <input
              placeholder="level"
              value={playerUpdate.level}
              onChange={(e) =>
                setPlayerUpdate((prev) => ({ ...prev, level: e.target.value }))
              }
            />
            <input
              placeholder="elo"
              value={playerUpdate.elo}
              onChange={(e) =>
                setPlayerUpdate((prev) => ({ ...prev, elo: e.target.value }))
              }
            />
            <button type="submit">Actualizar Player</button>
          </form>

          <form className="console-form" onSubmit={handlePlayerDelete}>
            <input
              placeholder="id a eliminar"
              value={playerDeleteId}
              onChange={(e) => setPlayerDeleteId(e.target.value)}
            />
            <button type="submit">Eliminar Player</button>
          </form>
        </article>

        <article className="console-card">
          <h2>Champion - GET</h2>
          <form className="console-form" onSubmit={handleChampionGet}>
            <input
              placeholder="name"
              value={championFilters.name}
              onChange={(e) =>
                setChampionFilters((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <input
              placeholder="role (TOP/MID...)"
              value={championFilters.role}
              onChange={(e) =>
                setChampionFilters((prev) => ({ ...prev, role: e.target.value }))
              }
            />
            <input
              placeholder="difficulty (EASY/MEDIUM/HARD)"
              value={championFilters.difficulty}
              onChange={(e) =>
                setChampionFilters((prev) => ({
                  ...prev,
                  difficulty: e.target.value,
                }))
              }
            />
            <button type="submit">Consultar</button>
          </form>
          <pre className="console-output">
            {JSON.stringify(championResults, null, 2)}
          </pre>
        </article>

        <article className="console-card">
          <h2>Champion - POST / DELETE</h2>
          <form className="console-form" onSubmit={handleChampionAdd}>
            <input
              placeholder="id (opcional)"
              value={championCreate.id}
              onChange={(e) =>
                setChampionCreate((prev) => ({ ...prev, id: e.target.value }))
              }
            />
            <input
              placeholder="name"
              value={championCreate.name}
              onChange={(e) =>
                setChampionCreate((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <input
              placeholder="description"
              value={championCreate.description}
              onChange={(e) =>
                setChampionCreate((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <input
              placeholder="difficulty (EASY/MEDIUM/HARD)"
              value={championCreate.difficulty}
              onChange={(e) =>
                setChampionCreate((prev) => ({
                  ...prev,
                  difficulty: e.target.value,
                }))
              }
            />
            <input
              placeholder="roles CSV (TOP,MID)"
              value={championCreate.roles}
              onChange={(e) =>
                setChampionCreate((prev) => ({ ...prev, roles: e.target.value }))
              }
            />
            <input
              placeholder="typeDamages CSV (MAGIC,TRUE)"
              value={championCreate.typeDamages}
              onChange={(e) =>
                setChampionCreate((prev) => ({
                  ...prev,
                  typeDamages: e.target.value,
                }))
              }
            />
            <button type="submit">Agregar Champion</button>
          </form>

          <form className="console-form" onSubmit={handleChampionDelete}>
            <input
              placeholder="id a eliminar"
              value={championDeleteId}
              onChange={(e) => setChampionDeleteId(e.target.value)}
            />
            <button type="submit">Eliminar Champion</button>
          </form>
        </article>

        <article className="console-card">
          <h2>Match - GET</h2>
          <form className="console-form" onSubmit={handleMatchGet}>
            <input
              placeholder="matchId"
              value={matchFilters.matchId}
              onChange={(e) =>
                setMatchFilters((prev) => ({ ...prev, matchId: e.target.value }))
              }
            />
            <input
              type="date"
              value={matchFilters.date}
              onChange={(e) =>
                setMatchFilters((prev) => ({ ...prev, date: e.target.value }))
              }
            />
            <button type="submit">Consultar</button>
          </form>
          <pre className="console-output">
            {JSON.stringify(matchResults, null, 2)}
          </pre>
        </article>

        <article className="console-card">
          <h2>Match - POST</h2>
          <form className="console-form" onSubmit={handleMatchAdd}>
            <input
              type="date"
              value={matchCreate.date}
              onChange={(e) =>
                setMatchCreate((prev) => ({ ...prev, date: e.target.value }))
              }
            />
            <input
              placeholder="teamWinner (Blue_Side/Red_Side)"
              value={matchCreate.teamWinner}
              onChange={(e) =>
                setMatchCreate((prev) => ({
                  ...prev,
                  teamWinner: e.target.value,
                }))
              }
            />
            <textarea
              rows={8}
              value={matchCreate.participations}
              onChange={(e) =>
                setMatchCreate((prev) => ({
                  ...prev,
                  participations: e.target.value,
                }))
              }
            />
            <p className="hint">
              JSON participations: <code>{participationExample}</code>
            </p>
            <button type="submit">Agregar Match</button>
          </form>
        </article>
      </div>
    </section>
  );
}

export default ApiConsole;
