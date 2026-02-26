import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function MainNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchType, setSearchType] = useState("player");
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (location.pathname === "/champions") {
      setSearchType("champion");
      setQuery(params.get("q") ?? "");
      return;
    }

    if (location.pathname === "/player") {
      setSearchType("player");
      setQuery(params.get("nickname") ?? "");
      setRegion(params.get("region") ?? "");
    }
  }, [location.pathname, location.search]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    const trimmedRegion = region.trim().toUpperCase();

    if (!trimmedQuery) {
      return;
    }

    if (searchType === "champion") {
      navigate(`/champions?q=${encodeURIComponent(trimmedQuery)}`);
      return;
    }

    if (!trimmedRegion) {
      return;
    }

    navigate(`/player?nickname=${encodeURIComponent(trimmedQuery)}&region=${encodeURIComponent(trimmedRegion)}`);
  };

  return (
    <header className="topbar-wrapper">
      <nav className="topbar" aria-label="Main">
        <NavLink to="/" className="brand-link">
          <span className="brand-mark">L</span>
          <span className="brand-text">League Hub</span>
        </NavLink>

        <div className="topbar-links">
          <NavLink to="/" className="top-link">
            INICIO
          </NavLink>
          <NavLink to="/champions" className="top-link">
            CAMPEONES
          </NavLink>
          <NavLink to="/player" className="top-link">
            JUGADORES
          </NavLink>
          <NavLink to="/api-console" className="top-link">
            ENDPOINTS
          </NavLink>
        </div>

        <form className="searchbar" onSubmit={handleSubmit}>
          <select
            value={searchType}
            onChange={(event) => setSearchType(event.target.value)}
            aria-label="Tipo de búsqueda"
          >
            <option value="player">Player</option>
            <option value="champion">Champion</option>
          </select>

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchType === "player" ? "Ej: Faker" : "Ej: Ahri"}
            aria-label="Buscar"
          />

          {searchType === "player" && (
            <input
              type="text"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              placeholder="Región (ej: LAS)"
              aria-label="Región"
            />
          )}

          <button type="submit">Buscar</button>
        </form>
      </nav>
    </header>
  );
}

export default MainNav;
