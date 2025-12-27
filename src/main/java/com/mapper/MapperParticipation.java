package com.mapper;

import com.dto.ParticipationDTO;
import com.model.Participation;
import org.springframework.stereotype.Component;

@Component

public class MapperParticipation {

    public ParticipationDTO toParticipationDTO(Participation participation){

        ParticipationDTO participationDTO = new ParticipationDTO(participation.getChampion().getId(),
                participation.getMatch().getMatchId(),
                participation.getParticipationId(),
                participation.getPlayer().getId(),
                participation.getRole(),
                participation.getTeamSide());

        return participationDTO;
    }

}
