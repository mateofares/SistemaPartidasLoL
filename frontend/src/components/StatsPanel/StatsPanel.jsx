function StatsPanel({ stats, loading }) {
  return (
    <section className="card stats-panel">
      <div className="card-header">
        <h2>Player Statistics</h2>
        {loading && <span className="pill">Loading</span>}
      </div>

      <div className="stats-grid">
        <div className="stat-tile">
          <p className="stat-label">Win Rate</p>
          <p className="stat-value">{stats?.winrate ?? "--"}</p>
        </div>
        <div className="stat-tile">
          <p className="stat-label">Matches</p>
          <p className="stat-value">{stats?.totalMatchesPlayed ?? "--"}</p>
        </div>
        <div className="stat-tile">
          <p className="stat-label">W / L</p>
          <p className="stat-value">
            {stats?.wins ?? "--"} / {stats?.losses ?? "--"}
          </p>
        </div>
      </div>

      <div className="most-played">
        <p className="section-title">Most Played Champions</p>
        {loading ? (
          <div className="loading-stack">
            <div className="loading-line" />
            <div className="loading-line" />
          </div>
        ) : stats?.champions?.length ? (
          <div className="champion-list">
            {stats.champions.map((champ) => (
              <div key={champ.championId} className="champion-row">
                <div className="champion-icon">
                  <span>{champ.championName?.[0] ?? "?"}</span>
                </div>
                <div>
                  <p className="champion-name">{champ.championName ?? "Unknown"}</p>
                  <p className="champion-sub">
                    {champ.totalMatches} games · {champ.winrate} winrate
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No champion stats yet.</p>
        )}
      </div>
    </section>
  );
}

export default StatsPanel;
