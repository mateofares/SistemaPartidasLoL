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

const add = ({ id, name, description, difficulty, roles, typeDamages }) => {
  return http.post("/champion/add", {
    id: id ? Number(id) : undefined,
    name,
    description,
    difficulty,
    roles,
    typeDamages,
  });
};

const remove = (id) => {
  return http.delete("/champion/delete", {
    params: { id: Number(id) },
  });
};

export default {
  getByFilters,
  add,
  remove,
};

