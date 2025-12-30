package com.mapper;

import com.dto.MatchDTO;
import com.dto.ParticipationDTO;
import com.dto.PlayerDTO;
import com.dto.TeamDTO;
import com.model.Match;
import com.model.Participation;
import com.model.TeamSide;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class MapperMatch {
    private MapperPlayer mapperPlayer;
    private MapperParticipation mapperParticipation;

    public MapperMatch(MapperPlayer mapperPlayer, MapperParticipation mapperParticipation){
        this.mapperPlayer=mapperPlayer;
        this.mapperParticipation=mapperParticipation;
    }
    public MatchDTO toMatchDTO(Match match){
        List<ParticipationDTO> participations = match.getParticipations()
                .stream().map(p->mapperParticipation.toParticipationDTO(p)).toList();

        List<ParticipationDTO> redTeam = participations.stream().filter(p->p.getTeamSide()== TeamSide.Red_Side).toList();
        List<ParticipationDTO> blueTeam = participations.stream().filter(p->p.getTeamSide()== TeamSide.Blue_Side).toList();

        TeamDTO blueSide = new TeamDTO(blueTeam,TeamSide.Blue_Side);
        TeamDTO redSide = new TeamDTO(redTeam,TeamSide.Red_Side);

        List<TeamDTO> teams = new ArrayList<TeamDTO>(2);
        teams.add(blueSide);
        teams.add(redSide);

        MatchDTO matchDTO = new MatchDTO(
                                    match.getDate(),
                                    participations,
                                    match.getTeamWinner());

        return matchDTO;
    }

}
