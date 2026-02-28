package com.dto;

public class PlayerStatsDTO {
    private Long playerId;
    private int totalMatchesPlayed;
    private int wins;
    private int losses;
    private double winrate;

    public PlayerStatsDTO(int losses, Long playerId, int totalMatchesPlayed, double winrate, int wins) {
        this.losses = losses;
        this.playerId = playerId;
        this.totalMatchesPlayed = totalMatchesPlayed;
        this.winrate = winrate;
        this.wins = wins;
    }

    public int getLosses() {
        return losses;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public int getTotalMatchesPlayed() {
        return totalMatchesPlayed;
    }

    public double getWinrate() {
        return winrate;
    }

    public int getWins() {
        return wins;
    }
}
