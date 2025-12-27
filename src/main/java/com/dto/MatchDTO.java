package com.dto;

import com.model.Participation;
import com.model.Player;
import com.model.TeamSide;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public class MatchDTO {
    private int matchId;
    private TeamSide teamWinner;
    private LocalDate date;
    private List<PlayerDTO> blueTeam;
    private List<PlayerDTO> redTeam;

}
