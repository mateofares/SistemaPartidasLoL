import http from "../../../services/http";

const getByFilters = ({ nickname, region, id, level, elo } = {}) => {
  return http.get("/player/get", {
    params: {
      id,
      nickname,
      region,
      level,
      elo,
    },
  });
};

export default {
  getByFilters,
};
