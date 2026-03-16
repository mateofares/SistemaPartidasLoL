function MatchCard({ match }) {
  const isWin = match?.result === "win";
  return (
    <article className={`match-card ${isWin ? "win" : "loss"}`}>
      <div className="match-left">
        <div className="champion">
          {match?.championName ? <span>{match.championName[0]}</span> : <span>?</span>}
        </div>
        <div>
          <p className="match-champion">{match?.championName ?? "Unknown"}</p>
          <p className="match-queue">{match?.role ?? "Role"}</p>
        </div>
      </div>

      <div className="match-middle">
        <p className="match-kda">{match?.teamSide ?? "Side"}</p>
        <p className="match-sub">Team Side</p>
      </div>

      <div className="match-right">
        <span className="match-result">{isWin ? "Victory" : "Defeat"}</span>
        <span className="match-duration">{match?.date ?? "--"}</span>
      </div>
    </article>
  );
}

export default MatchCard;
