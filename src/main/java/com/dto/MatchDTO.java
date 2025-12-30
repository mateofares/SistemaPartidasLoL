package com.dto;

import com.model.Participation;
import com.model.Player;
import com.model.TeamSide;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public class MatchDTO {
    private Long matchId;
    private TeamSide teamWinner;
    private LocalDate date;
    private List<ParticipationDTO> participations;

    public MatchDTO(LocalDate date, List<ParticipationDTO> participations, TeamSide teamWinner) {
        this.date = date;
        this.participations = participations;
        this.teamWinner = teamWinner;
    }

    public List<ParticipationDTO> getParticipations() {
        return participations;
    }

    public LocalDate getDate() {
        return date;
    }

    public TeamSide getTeamWinner() {
        return teamWinner;
    }
}
