package com.dto;

import com.model.TeamSide;

import java.util.List;

public class TeamDTO {
    private TeamSide teamSide;
    private List<ParticipationDTO> players;

    public TeamDTO(List<ParticipationDTO> players, TeamSide teamSide) {
        this.players = players;
        this.teamSide = teamSide;
    }

    public List<ParticipationDTO> getPlayers() {
        return players;
    }

    public TeamSide getTeamSide() {
        return teamSide;
    }
}
