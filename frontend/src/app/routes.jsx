import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Champions from "../pages/Champions";
import PlayerDetail from "../features/players/pages/PlayerDetail";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/player" element={<PlayerDetail />} />
      <Route path="/champions" element={<Champions />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
