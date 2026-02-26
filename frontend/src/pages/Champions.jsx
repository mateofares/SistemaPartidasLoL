import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import championService from "../services/champion.api";

function Champions() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const name = (searchParams.get("q") ?? "").trim();
  const role = (searchParams.get("role") ?? "").trim().toUpperCase();
  const difficulty = (searchParams.get("difficulty") ?? "").trim().toUpperCase();

  const [nameInput, setNameInput] = useState(name);
  const [roleInput, setRoleInput] = useState(role);
  const [difficultyInput, setDifficultyInput] = useState(difficulty);

  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setNameInput(name);
    setRoleInput(role);
    setDifficultyInput(difficulty);
  }, [name, role, difficulty]);

  useEffect(() => {
    setLoading(true);
    setError("");

    championService
      .getByFilters({
        name: name || undefined,
        role: role || undefined,
        difficulty: difficulty || undefined,
      })
      .then((response) => {
        setChampions(response.data ?? []);
      })
      .catch(() => {
        setError("No se pudieron cargar champions desde el backend.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name, role, difficulty]);

  const handleFilterSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    const trimmedName = nameInput.trim();
    const trimmedRole = roleInput.trim().toUpperCase();
    const trimmedDifficulty = difficultyInput.trim().toUpperCase();

    if (trimmedName) {
      params.set("q", trimmedName);
    }
    if (trimmedRole) {
      params.set("role", trimmedRole);
    }
    if (trimmedDifficulty) {
      params.set("difficulty", trimmedDifficulty);
    }

    const queryString = params.toString();
    navigate(queryString ? `/champions?${queryString}` : "/champions");
  };

  return (
    <section>
      <h1>Champions</h1>
      <p className="page-subtitle">Listado y filtros desde la base de datos</p>

      <form className="searchbar page-search" onSubmit={handleFilterSubmit}>
        <input
          type="text"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          placeholder="Nombre (ej: Ahri)"
          aria-label="Nombre champion"
        />
        <input
          type="text"
          value={roleInput}
          onChange={(event) => setRoleInput(event.target.value)}
          placeholder="Role (TOP/JUNGLE/MID/ADC/SUPPORT)"
          aria-label="Role champion"
        />
        <input
          type="text"
          value={difficultyInput}
          onChange={(event) => setDifficultyInput(event.target.value)}
          placeholder="Difficulty (EASY/MEDIUM/HARD)"
          aria-label="Dificultad champion"
        />
        <button type="submit">Filtrar</button>
      </form>

      {loading ? <p className="empty-state">Cargando champions...</p> : null}
      {error ? <p className="error-state">{error}</p> : null}

      {!loading && !error ? (
        <div className="grid-cards">
          {champions.length > 0 ? (
            champions.map((champion) => (
              <article key={champion.id ?? champion.name} className="champion-card">
                <h2>{champion.name}</h2>
                <p>
                  <strong>Dificultad:</strong> {champion.difficulty}
                </p>
                <p>
                  <strong>Roles:</strong> {(champion.roles ?? []).join(", ") || "-"}
                </p>
                <p>
                  <strong>Daño:</strong> {(champion.typeDamages ?? []).join(", ") || "-"}
                </p>
              </article>
            ))
          ) : (
            <p className="empty-state">No hay champions para ese filtro.</p>
          )}
        </div>
      ) : null}
    </section>
  );
}

export default Champions;
