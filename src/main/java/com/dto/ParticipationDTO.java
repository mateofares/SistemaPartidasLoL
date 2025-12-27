package com.dto;

import com.model.Role;
import com.model.TeamSide;
import jakarta.persistence.criteria.CriteriaBuilder;

public class ParticipationDTO {
    //attributes of Participation
    private int participationId;
    private Role role;
    private TeamSide teamSide;
    private Integer playerId;
    private Integer matchId;
    private Integer ChampionId;

}
