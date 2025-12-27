package com.dto;

import com.model.Role;
import com.model.TeamSide;
import jakarta.persistence.criteria.CriteriaBuilder;

public class ParticipationDTO {
    //attributes of Participation
    private Long participationId;
    private Role role;
    private TeamSide teamSide;
    private Long playerId;
    private Long matchId;
    private Long ChampionId;

    public ParticipationDTO(Long championId, Long matchId, Long participationId, Long playerId, Role role, TeamSide teamSide) {
        ChampionId = championId;
        this.matchId = matchId;
        this.participationId = participationId;
        this.playerId = playerId;
        this.role = role;
        this.teamSide = teamSide;
    }
}
