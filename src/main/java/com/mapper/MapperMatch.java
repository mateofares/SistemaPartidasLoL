package com.mapper;

import com.dto.MatchDTO;
import com.dto.ParticipationDTO;
import com.dto.PlayerDTO;
import com.model.Match;
import com.model.Participation;

import java.util.ArrayList;
import java.util.List;

public class MapperMatch {

    public static MatchDTO toMatchDTO(Match match){
        List<PlayerDTO> blueTeam = new ArrayList<>(5);
        List<PlayerDTO> redTeam = new ArrayList<>(5);
        int i=1;
        for(Participation p : match.getParticipations()){
            if(i<6){
                PlayerDTO playerDTO = MapperPlayer.toPlayerDTO(p.getPlayer()); //map player to playerDto
                blueTeam.add(playerDTO);//add player in blue team if i < 5 (when i > 5, the player plays to redTeam)
            }else{
                PlayerDTO playerDTO = MapperPlayer.toPlayerDTO(p.getPlayer()); //map player to playerDto
                redTeam.add(playerDTO); //red team
            }
        }
        MatchDTO matchDTO = new MatchDTO(blueTeam,
                                    match.getDate(),
                                    match.getMatchId(),
                                    redTeam,
                                    match.getTeamWinner());

        return matchDTO;
    }

}
