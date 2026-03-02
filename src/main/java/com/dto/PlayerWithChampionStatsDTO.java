package com.dto;

public class PlayerWithChampionStatsDTO {

    private Long championId;
    private String championName;
    private int totalMatches;
    private double winrate;
    private int wins;
    private int losses;

    public PlayerWithChampionStatsDTO(Long championId, String championName, int losses, int totalMatches, double winrate, int wins) {
        this.championId = championId;
        this.championName = championName;
        this.losses = losses;
        this.totalMatches = totalMatches;
        this.winrate = winrate;
        this.wins = wins;
    }

    public void setChampionId(Long championId) {
        this.championId = championId;
    }

    public void setTotalMatches(int totalMatches) {
        this.totalMatches = totalMatches;
    }

    public void setWinrate(double winrate) {
        this.winrate = winrate;
    }

    public Long getChampionId() {
        return championId;
    }

    public String getChampionName() {
        return championName;
    }

    public int getTotalMatches() {
        return totalMatches;
    }

    public double getWinrate() {
        return winrate;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getLosses() {
        return losses;
    }

    public void setLosses(int losses) {
        this.losses = losses;
    }
}
