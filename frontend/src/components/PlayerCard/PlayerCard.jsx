function PlayerCard({ player, loading }) {
  return (
    <section className="card player-card">
      <div className="card-header">
        <h2>Player Profile</h2>
        {loading && <span className="pill">Loading</span>}
      </div>

      <div className="player-body">
        <div className="player-avatar">
          <span>{player?.nickname?.[0] ?? "?"}</span>
        </div>

        <div className="player-info">
          <p className="player-name">{player?.nickname ?? "Summoner"}</p>
          <p className="player-level">Level {player?.level ?? "--"}</p>
          <div className="player-tier">
            <span>{player?.elo ?? "Unranked"}</span>
            <span className="tier-rank">{player?.region ?? ""}</span>
          </div>
        </div>
      </div>

      {!player && !loading && (
        <p className="empty-state">Search for a summoner to load profile data.</p>
      )}
    </section>
  );
}

export default PlayerCard;
