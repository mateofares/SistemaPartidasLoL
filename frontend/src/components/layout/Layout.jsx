function Layout({ children }) {
  return (
    <div className="app-shell">
      <div className="app-glow" aria-hidden="true" />
      <div className="app-content">{children}</div>
    </div>
  );
}

export default Layout;
