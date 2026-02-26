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

const add = ({ id, nickname, region, level, elo }) => {
  return http.post("/player/add", {
    id: id ? Number(id) : undefined,
    nickname,
    region,
    level: level ? Number(level) : undefined,
    elo,
  });
};

const update = ({ id, nickname, region, level, elo }) => {
  return http.patch("/player/update", null, {
    params: {
      id: Number(id),
      nickname,
      region,
      level: level ? Number(level) : undefined,
      elo,
    },
  });
};

const remove = (id) => {
  return http.delete("/player/delete", {
    params: { id: Number(id) },
  });
};

export default {
  getByFilters,
  add,
  update,
  remove,
};
