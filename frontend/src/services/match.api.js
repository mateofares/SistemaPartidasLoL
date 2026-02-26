import http from "./http";

const getByFilters = ({ matchId, date } = {}) => {
  return http.get("/match/get", {
    params: {
      matchId: matchId ? Number(matchId) : undefined,
      date: date || undefined,
    },
  });
};

const add = ({ date, teamWinner, participations }) => {
  return http.post("/match/add", {
    date,
    teamWinner,
    participations,
  });
};

export default {
  getByFilters,
  add,
};
