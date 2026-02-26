import MainNav from "./components/layout/MainNav";
import AppRoutes from "./app/routes";

function App() {
  return (
    <div className="app-shell">
      <MainNav />
      <main className="app-content">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
