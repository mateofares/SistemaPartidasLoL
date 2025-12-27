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
    private List<PlayerDTO> blueTeam;
    private List<PlayerDTO> redTeam;

    public MatchDTO(List<PlayerDTO> blueTeam, LocalDate date, Long matchId, List<PlayerDTO> redTeam, TeamSide teamWinner) {
        this.blueTeam = blueTeam;
        this.date = date;
        this.matchId = matchId;
        this.redTeam = redTeam;
        this.teamWinner = teamWinner;
    }
}
