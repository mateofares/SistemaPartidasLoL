const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const buildUrl = (path, params = {}) => {
  const url = new URL(path, API_BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  const contentType = response.headers.get("content-type") || "";
  if (response.status === 204) {
    return null;
  }
  if (contentType.includes("application/json")) {
    return response.json();
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export const getPlayers = async ({ id, nickname, region, level, elo } = {}) => {
  const url = buildUrl("/player/get", { id, nickname, region, level, elo });
  const response = await fetch(url);
  return handleResponse(response);
};

export const getPlayerStats = async (id) => {
  const url = buildUrl("/player/getStats", { id });
  const response = await fetch(url);
  return handleResponse(response);
};

export const getPlayerChampionStats = async (id) => {
  const url = buildUrl("/player/getChampionsStats", { id });
  const response = await fetch(url);
  return handleResponse(response);
};

export const addPlayer = async (player) => {
  const url = buildUrl("/player/add");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(player),
  });
  return handleResponse(response);
};

export const updatePlayer = async ({ id, nickname, region, level, elo }) => {
  const url = buildUrl("/player/update", { id, nickname, region, level, elo });
  const response = await fetch(url, { method: "PATCH" });
  return handleResponse(response);
};

export const deletePlayer = async (id) => {
  const url = buildUrl("/player/delete", { id });
  const response = await fetch(url, { method: "DELETE" });
  return handleResponse(response);
};

export const getMatches = async ({ matchId, date } = {}) => {
  const url = buildUrl("/match/get", { matchId, date });
  const response = await fetch(url);
  return handleResponse(response);
};

export const addMatch = async (match) => {
  const url = buildUrl("/match/add");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(match),
  });
  return handleResponse(response);
};

export const getChampions = async ({ name, role, difficulty } = {}) => {
  const url = buildUrl("/champion/all", { name, role, difficulty });
  const response = await fetch(url);
  return handleResponse(response);
};

export const addChampion = async (champion) => {
  const url = buildUrl("/champion/add");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(champion),
  });
  return handleResponse(response);
};

export const deleteChampion = async (id) => {
  const url = buildUrl("/champion/delete", { id });
  const response = await fetch(url, { method: "DELETE" });
  return handleResponse(response);
};

export default {
  getPlayers,
  getPlayerStats,
  getPlayerChampionStats,
  addPlayer,
  updatePlayer,
  deletePlayer,
  getMatches,
  addMatch,
  getChampions,
  addChampion,
  deleteChampion,
};
