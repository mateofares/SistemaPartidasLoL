import SearchBar from "../SearchBar/SearchBar";

function Navbar({ onSearch, loading }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">LoL</div>
        <div>
          <p className="brand-title">LoL Match Analyzer</p>
          <p className="brand-subtitle">Summoner insights and match breakdowns</p>
        </div>
      </div>

      <SearchBar onSearch={onSearch} loading={loading} />

      <div className="profile">
        <div className="profile-ring" />
        <div>
          <p className="profile-name">Guest Scout</p>
          <p className="profile-role">Analyst</p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
