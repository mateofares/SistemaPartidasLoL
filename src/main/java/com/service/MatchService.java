package com.service;

import com.dto.MatchDTO;
import com.dto.ParticipationDTO;
import com.mapper.MapperMatch;
import com.model.Champion;
import com.model.Match;
import com.model.Participation;
import com.model.Player;
import com.repository.ChampionRepository;
import com.repository.MatchRepository;
import com.repository.ParticipationRepository;
import com.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service

public class MatchService implements IMatchService {
    private MatchRepository matchRepository;
    private ParticipationRepository participationRepository;
    private PlayerRepository playerRepository;
    private ChampionRepository championRepository;
    private MapperMatch mapperMatch;

    public MatchService(ChampionRepository championRepository, MatchRepository matchRepository, ParticipationRepository participationRepository, PlayerRepository playerRepository, MapperMatch mapperMatch) {
        this.championRepository = championRepository;
        this.matchRepository = matchRepository;
        this.participationRepository = participationRepository;
        this.playerRepository = playerRepository;
        this.mapperMatch=mapperMatch;
    }

    @Override
    public List<MatchDTO> getMatchs(Long matchId, Date date) {
        List<Match> matches = matchRepository.findAll();
        if (matchId != null){
            matches = matches.stream().filter(m->m.getMatchId().equals(matchId)).toList();
        }
        if (date != null){
            matches = matches.stream().filter(m->m.getDate().equals(date)).toList();
        }

        return matches.stream().map(m->mapperMatch.toMatchDTO(m)).toList();

    }

    @Override
    public void addMatch(MatchDTO matchDTO) {

        if (matchDTO != null){

            if (matchDTO.getParticipations().size() != 10) {
                throw new IllegalArgumentException("A match must have exactly 10 participations");
            }

            Match match = new Match(
                    matchDTO.getTeamWinner(),
                    matchDTO.getDate()
            );
            matchRepository.save(match);
            for (ParticipationDTO p : matchDTO.getParticipations()){
                addParticipation(match,p);
            }
        }
    }

    private void addParticipation(Match match,ParticipationDTO participationDTO){

        Player player = playerRepository.findById(participationDTO.getPlayerId())
                .orElseThrow(()->new RuntimeException("Player not exists"));

        Champion champion = championRepository.findById(participationDTO.getChampionId())
                .orElseThrow(()->new RuntimeException("Champion not exists"));

        Participation participation = new Participation(
                participationDTO.getRole(),
                participationDTO.getTeamSide(),
                player,
                match,
                champion
        );

        participationRepository.save(participation);
    }
}
