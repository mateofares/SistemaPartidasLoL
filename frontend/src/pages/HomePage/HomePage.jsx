import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Navbar from "../../components/Navbar/Navbar";
import PlayerCard from "../../components/PlayerCard/PlayerCard";
import MatchList from "../../components/MatchList/MatchList";
import StatsPanel from "../../components/StatsPanel/StatsPanel";
import {
  addChampion,
  addMatch,
  addPlayer,
  deleteChampion,
  deletePlayer,
  getChampions,
  getMatches,
  getPlayerChampionStats,
  getPlayers,
  getPlayerStats,
  updatePlayer,
} from "../../services/api";

const formatWinrate = (value) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }
  return `${Number(value).toFixed(1)}%`;
};

const toOptionalNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
};

const parseCsv = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

function HomePage() {
  const [player, setPlayer] = useState(null);
  const [matches, setMatches] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [playerFilters, setPlayerFilters] = useState({
    id: "",
    nickname: "",
    region: "",
    level: "",
    elo: "",
  });
  const [playerList, setPlayerList] = useState([]);
  const [playerForm, setPlayerForm] = useState({
    id: "",
    nickname: "",
    region: "",
    level: "",
    elo: "",
  });
  const [playerUpdateForm, setPlayerUpdateForm] = useState({
    id: "",
    nickname: "",
    region: "",
    level: "",
    elo: "",
  });
  const [playerDeleteId, setPlayerDeleteId] = useState("");
  const [playerActionStatus, setPlayerActionStatus] = useState("");
  const [playerActionError, setPlayerActionError] = useState("");
  const [loadingPlayers, setLoadingPlayers] = useState(false);

  const [championFilters, setChampionFilters] = useState({
    name: "",
    role: "",
    difficulty: "",
  });
  const [championList, setChampionList] = useState([]);
  const [championForm, setChampionForm] = useState({
    id: "",
    name: "",
    description: "",
    roles: "",
    difficulty: "",
    typeDamages: "",
  });
  const [championDeleteId, setChampionDeleteId] = useState("");
  const [championActionStatus, setChampionActionStatus] = useState("");
  const [championActionError, setChampionActionError] = useState("");
  const [loadingChampions, setLoadingChampions] = useState(false);

  const [matchFilters, setMatchFilters] = useState({ matchId: "", date: "" });
  const [matchList, setMatchList] = useState([]);
  const [matchForm, setMatchForm] = useState({
    date: "",
    teamWinner: "",
    participations: "",
  });
  const [matchActionStatus, setMatchActionStatus] = useState("");
  const [matchActionError, setMatchActionError] = useState("");
  const [loadingMatches, setLoadingMatches] = useState(false);

  const resetSearchData = () => {
    setPlayer(null);
    setMatches([]);
    setStats(null);
  };

  const handleSearch = async (summonerName) => {
    setLoadingSearch(true);
    setSearchError("");
    resetSearchData();

    try {
      const players = await getPlayers({ nickname: summonerName });
      const selectedPlayer = Array.isArray(players) ? players[0] : null;

      if (!selectedPlayer) {
        setSearchError("Player not found.");
        return;
      }

      setPlayer(selectedPlayer);

      const [playerStats, championStats, allMatches, allChampions] = await Promise.all([
        getPlayerStats(selectedPlayer.id),
        getPlayerChampionStats(selectedPlayer.id),
        getMatches(),
        getChampions(),
      ]);

      const championNameMap = new Map(
        (allChampions || []).map((champion) => [champion.id, champion.name]),
      );

      const playerMatches = (allMatches || [])
        .map((match, index) => {
          const participation = (match.participations || []).find(
            (item) => item.playerId === selectedPlayer.id,
          );

          if (!participation) {
            return null;
          }

          const championName = championNameMap.get(participation.championId) || "Unknown";
          const isWin = participation.teamSide === match.teamWinner;

          return {
            id: match.matchId ?? `${participation.matchId ?? "match"}-${index}`,
            championName,
            role: participation.role,
            teamSide: participation.teamSide,
            result: isWin ? "win" : "loss",
            date: match.date,
          };
        })
        .filter(Boolean);

      setMatches(playerMatches);

      const sortedChampionStats = [...(championStats || [])].sort(
        (a, b) => b.totalMatches - a.totalMatches,
      );

      const safeStats = playerStats || {};

      setStats({
        ...safeStats,
        winrate: formatWinrate(safeStats.winrate),
        champions: sortedChampionStats.slice(0, 3).map((champ) => ({
          ...champ,
          winrate: formatWinrate(champ.winrate),
        })),
      });
    } catch (fetchError) {
      setSearchError("Could not load player data. Please try again.");
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleFetchPlayers = async () => {
    setLoadingPlayers(true);
    setPlayerActionError("");
    setPlayerActionStatus("");
    try {
      const result = await getPlayers({
        id: toOptionalNumber(playerFilters.id),
        nickname: playerFilters.nickname,
        region: playerFilters.region,
        level: toOptionalNumber(playerFilters.level),
        elo: playerFilters.elo,
      });
      setPlayerList(result || []);
      setPlayerActionStatus("Players loaded.");
    } catch (error) {
      setPlayerActionError("Failed to load players.");
    } finally {
      setLoadingPlayers(false);
    }
  };

  const handleAddPlayer = async () => {
    setPlayerActionError("");
    setPlayerActionStatus("");
    try {
      await addPlayer({
        id: toOptionalNumber(playerForm.id),
        nickname: playerForm.nickname,
        region: playerForm.region,
        level: toOptionalNumber(playerForm.level),
        elo: playerForm.elo,
      });
      setPlayerActionStatus("Player added.");
    } catch (error) {
      setPlayerActionError("Failed to add player.");
    }
  };

  const handleUpdatePlayer = async () => {
    setPlayerActionError("");
    setPlayerActionStatus("");
    try {
      await updatePlayer({
        id: toOptionalNumber(playerUpdateForm.id),
        nickname: playerUpdateForm.nickname || undefined,
        region: playerUpdateForm.region || undefined,
        level: toOptionalNumber(playerUpdateForm.level),
        elo: playerUpdateForm.elo || undefined,
      });
      setPlayerActionStatus("Player updated.");
    } catch (error) {
      setPlayerActionError("Failed to update player.");
    }
  };

  const handleDeletePlayer = async () => {
    setPlayerActionError("");
    setPlayerActionStatus("");
    try {
      await deletePlayer(toOptionalNumber(playerDeleteId));
      setPlayerActionStatus("Player deleted.");
    } catch (error) {
      setPlayerActionError("Failed to delete player.");
    }
  };

  const handleFetchChampions = async () => {
    setLoadingChampions(true);
    setChampionActionError("");
    setChampionActionStatus("");
    try {
      const result = await getChampions({
        name: championFilters.name,
        role: championFilters.role,
        difficulty: championFilters.difficulty,
      });
      setChampionList(result || []);
      setChampionActionStatus("Champions loaded.");
    } catch (error) {
      setChampionActionError("Failed to load champions.");
    } finally {
      setLoadingChampions(false);
    }
  };

  const handleAddChampion = async () => {
    setChampionActionError("");
    setChampionActionStatus("");
    try {
      await addChampion({
        id: toOptionalNumber(championForm.id),
        name: championForm.name,
        description: championForm.description,
        roles: parseCsv(championForm.roles),
        difficulty: championForm.difficulty,
        typeDamages: parseCsv(championForm.typeDamages),
      });
      setChampionActionStatus("Champion added.");
    } catch (error) {
      setChampionActionError("Failed to add champion.");
    }
  };

  const handleDeleteChampion = async () => {
    setChampionActionError("");
    setChampionActionStatus("");
    try {
      await deleteChampion(toOptionalNumber(championDeleteId));
      setChampionActionStatus("Champion deleted.");
    } catch (error) {
      setChampionActionError("Failed to delete champion.");
    }
  };

  const handleFetchMatches = async () => {
    setLoadingMatches(true);
    setMatchActionError("");
    setMatchActionStatus("");
    try {
      const result = await getMatches({
        matchId: toOptionalNumber(matchFilters.matchId),
        date: matchFilters.date || undefined,
      });
      setMatchList(result || []);
      setMatchActionStatus("Matches loaded.");
    } catch (error) {
      setMatchActionError("Failed to load matches.");
    } finally {
      setLoadingMatches(false);
    }
  };

  const handleAddMatch = async () => {
    setMatchActionError("");
    setMatchActionStatus("");
    try {
      const parsedParticipations = matchForm.participations
        ? JSON.parse(matchForm.participations)
        : [];
      if (!Array.isArray(parsedParticipations)) {
        throw new Error("Participations must be an array");
      }
      await addMatch({
        date: matchForm.date,
        teamWinner: matchForm.teamWinner,
        participations: parsedParticipations,
      });
      setMatchActionStatus("Match added.");
    } catch (error) {
      setMatchActionError("Failed to add match. Check JSON format.");
    }
  };

  return (
    <Layout>
      <Navbar onSearch={handleSearch} loading={loadingSearch} />

      <section className="dashboard">
        <aside className="dashboard-left">
          <PlayerCard player={player} loading={loadingSearch} />
          {searchError && <p className="error-banner">{searchError}</p>}
        </aside>

        <main className="dashboard-center">
          <MatchList matches={matches} loading={loadingSearch} />
        </main>

        <aside className="dashboard-right">
          <StatsPanel stats={stats} loading={loadingSearch} />
        </aside>
      </section>

      <section className="dashboard tools-grid">
        <section className="card tool-card">
          <div className="card-header">
            <h2>Players</h2>
            {loadingPlayers && <span className="pill">Loading</span>}
          </div>

          <div className="form-grid">
            <input
              className="input"
              placeholder="Id"
              value={playerFilters.id}
              onChange={(event) =>
                setPlayerFilters((prev) => ({ ...prev, id: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Nickname"
              value={playerFilters.nickname}
              onChange={(event) =>
                setPlayerFilters((prev) => ({ ...prev, nickname: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Region (LAS, NA, ...)"
              value={playerFilters.region}
              onChange={(event) =>
                setPlayerFilters((prev) => ({ ...prev, region: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Level"
              value={playerFilters.level}
              onChange={(event) =>
                setPlayerFilters((prev) => ({ ...prev, level: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Elo"
              value={playerFilters.elo}
              onChange={(event) =>
                setPlayerFilters((prev) => ({ ...prev, elo: event.target.value }))
              }
            />
          </div>
          <div className="action-row">
            <button className="btn" onClick={handleFetchPlayers} disabled={loadingPlayers}>
              Load Players
            </button>
          </div>

          {playerActionStatus && <p className="status-text">{playerActionStatus}</p>}
          {playerActionError && <p className="error-text">{playerActionError}</p>}

          <div className="data-list">
            {(playerList || []).map((item) => (
              <div key={item.id} className="data-row">
                <span>{item.nickname}</span>
                <span className="badge">{item.region}</span>
                <span>Lvl {item.level}</span>
                <span className="badge">{item.elo}</span>
              </div>
            ))}
          </div>

          <div className="divider" />

          <p className="section-title">Add Player</p>
          <div className="form-grid">
            <input
              className="input"
              placeholder="Id"
              value={playerForm.id}
              onChange={(event) =>
                setPlayerForm((prev) => ({ ...prev, id: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Nickname"
              value={playerForm.nickname}
              onChange={(event) =>
                setPlayerForm((prev) => ({ ...prev, nickname: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Region"
              value={playerForm.region}
              onChange={(event) =>
                setPlayerForm((prev) => ({ ...prev, region: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Level"
              value={playerForm.level}
              onChange={(event) =>
                setPlayerForm((prev) => ({ ...prev, level: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Elo"
              value={playerForm.elo}
              onChange={(event) =>
                setPlayerForm((prev) => ({ ...prev, elo: event.target.value }))
              }
            />
          </div>
          <div className="action-row">
            <button className="btn" onClick={handleAddPlayer}>
              Create Player
            </button>
          </div>

          <p className="section-title">Update Player</p>
          <div className="form-grid">
            <input
              className="input"
              placeholder="Id (required)"
              value={playerUpdateForm.id}
              onChange={(event) =>
                setPlayerUpdateForm((prev) => ({ ...prev, id: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Nickname"
              value={playerUpdateForm.nickname}
              onChange={(event) =>
                setPlayerUpdateForm((prev) => ({ ...prev, nickname: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Region"
              value={playerUpdateForm.region}
              onChange={(event) =>
                setPlayerUpdateForm((prev) => ({ ...prev, region: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Level"
              value={playerUpdateForm.level}
              onChange={(event) =>
                setPlayerUpdateForm((prev) => ({ ...prev, level: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Elo"
              value={playerUpdateForm.elo}
              onChange={(event) =>
                setPlayerUpdateForm((prev) => ({ ...prev, elo: event.target.value }))
              }
            />
          </div>
          <div className="action-row">
            <button className="btn" onClick={handleUpdatePlayer}>
              Update Player
            </button>
          </div>

          <p className="section-title">Delete Player</p>
          <div className="form-grid">
            <input
              className="input"
              placeholder="Id"
              value={playerDeleteId}
              onChange={(event) => setPlayerDeleteId(event.target.value)}
            />
          </div>
          <div className="action-row">
            <button className="btn danger" onClick={handleDeletePlayer}>
              Delete Player
            </button>
          </div>
        </section>

        <section className="card tool-card">
          <div className="card-header">
            <h2>Champions</h2>
            {loadingChampions && <span className="pill">Loading</span>}
          </div>

          <div className="form-grid">
            <input
              className="input"
              placeholder="Name"
              value={championFilters.name}
              onChange={(event) =>
                setChampionFilters((prev) => ({ ...prev, name: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Role (MID, TOP, ...)"
              value={championFilters.role}
              onChange={(event) =>
                setChampionFilters((prev) => ({ ...prev, role: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Difficulty"
              value={championFilters.difficulty}
              onChange={(event) =>
                setChampionFilters((prev) => ({ ...prev, difficulty: event.target.value }))
              }
            />
          </div>
          <div className="action-row">
            <button className="btn" onClick={handleFetchChampions} disabled={loadingChampions}>
              Load Champions
            </button>
          </div>

          {championActionStatus && <p className="status-text">{championActionStatus}</p>}
          {championActionError && <p className="error-text">{championActionError}</p>}

          <div className="data-list">
            {(championList || []).map((item) => (
              <div key={item.id} className="data-row">
                <span>{item.name}</span>
                <span className="badge">{item.difficulty}</span>
                <span className="muted">{item.roles?.join(", ")}</span>
              </div>
            ))}
          </div>

          <div className="divider" />

          <p className="section-title">Add Champion</p>
          <div className="form-grid">
            <input
              className="input"
              placeholder="Id"
              value={championForm.id}
              onChange={(event) =>
                setChampionForm((prev) => ({ ...prev, id: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Name"
              value={championForm.name}
              onChange={(event) =>
                setChampionForm((prev) => ({ ...prev, name: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Description"
              value={championForm.description}
              onChange={(event) =>
                setChampionForm((prev) => ({ ...prev, description: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Roles (comma separated)"
              value={championForm.roles}
              onChange={(event) =>
                setChampionForm((prev) => ({ ...prev, roles: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Difficulty"
              value={championForm.difficulty}
              onChange={(event) =>
                setChampionForm((prev) => ({ ...prev, difficulty: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Type Damages (comma separated)"
              value={championForm.typeDamages}
              onChange={(event) =>
                setChampionForm((prev) => ({ ...prev, typeDamages: event.target.value }))
              }
            />
          </div>
          <div className="action-row">
            <button className="btn" onClick={handleAddChampion}>
              Create Champion
            </button>
          </div>

          <p className="section-title">Delete Champion</p>
          <div className="form-grid">
            <input
              className="input"
              placeholder="Id"
              value={championDeleteId}
              onChange={(event) => setChampionDeleteId(event.target.value)}
            />
          </div>
          <div className="action-row">
            <button className="btn danger" onClick={handleDeleteChampion}>
              Delete Champion
            </button>
          </div>
        </section>

        <section className="card tool-card">
          <div className="card-header">
            <h2>Matches</h2>
            {loadingMatches && <span className="pill">Loading</span>}
          </div>

          <div className="form-grid">
            <input
              className="input"
              placeholder="Match Id"
              value={matchFilters.matchId}
              onChange={(event) =>
                setMatchFilters((prev) => ({ ...prev, matchId: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Date (YYYY-MM-DD)"
              value={matchFilters.date}
              onChange={(event) =>
                setMatchFilters((prev) => ({ ...prev, date: event.target.value }))
              }
            />
          </div>
          <div className="action-row">
            <button className="btn" onClick={handleFetchMatches} disabled={loadingMatches}>
              Load Matches
            </button>
          </div>

          {matchActionStatus && <p className="status-text">{matchActionStatus}</p>}
          {matchActionError && <p className="error-text">{matchActionError}</p>}

          <div className="data-list">
            {(matchList || []).map((item, index) => (
              <div key={`${item.matchId ?? index}`} className="data-row">
                <span>Match {item.matchId ?? "--"}</span>
                <span className="badge">{item.teamWinner}</span>
                <span className="muted">{item.date}</span>
              </div>
            ))}
          </div>

          <div className="divider" />

          <p className="section-title">Add Match</p>
          <div className="form-grid">
            <input
              className="input"
              placeholder="Date (YYYY-MM-DD)"
              value={matchForm.date}
              onChange={(event) =>
                setMatchForm((prev) => ({ ...prev, date: event.target.value }))
              }
            />
            <input
              className="input"
              placeholder="Team Winner (Blue_Side / Red_Side)"
              value={matchForm.teamWinner}
              onChange={(event) =>
                setMatchForm((prev) => ({ ...prev, teamWinner: event.target.value }))
              }
            />
            <textarea
              className="textarea"
              placeholder='Participations JSON array (e.g. [{"participationId":1,"role":"MID","teamSide":"Blue_Side","playerId":1,"matchId":100,"championId":157}])'
              value={matchForm.participations}
              onChange={(event) =>
                setMatchForm((prev) => ({ ...prev, participations: event.target.value }))
              }
            />
          </div>
          <div className="action-row">
            <button className="btn" onClick={handleAddMatch}>
              Create Match
            </button>
          </div>
        </section>
      </section>
    </Layout>
  );
}

export default HomePage;
