import http from "./http";

const getByFilters = ({ name, role, difficulty } = {}) => {
  return http.get("/champion/all", {
    params: {
      name,
      role,
      difficulty,
    },
  });
};

export default {
  getByFilters,
};

