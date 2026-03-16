import MatchCard from "../MatchCard/MatchCard";

function MatchList({ matches, loading }) {
  return (
    <section className="card match-list">
      <div className="card-header">
        <h2>Match History</h2>
        <span className="pill">{matches?.length ?? 0} total</span>
      </div>

      {loading ? (
        <div className="loading-stack">
          <div className="loading-line" />
          <div className="loading-line" />
          <div className="loading-line" />
        </div>
      ) : matches?.length ? (
        <div className="match-stack">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      ) : (
        <p className="empty-state">No matches available for this player.</p>
      )}
    </section>
  );
}

export default MatchList;
