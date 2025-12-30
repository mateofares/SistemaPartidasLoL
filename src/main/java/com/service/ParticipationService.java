package com.service;

import com.dto.ParticipationDTO;
import com.model.Champion;
import com.model.Match;
import com.model.Participation;
import com.repository.ChampionRepository;
import com.repository.ParticipationRepository;
import com.repository.PlayerRepository;
import org.springframework.stereotype.Service;

@Service

public class ParticipationService implements IParticipationService {
    private ParticipationRepository participationRepository;
    private PlayerService playerService;
    private ChampionService championService;
    private MatchService matchService;

    public ParticipationService(ChampionService championService,
                                ParticipationRepository participationRepository,
                                PlayerService playerService,
                                MatchService matchService) {
        this.championService = championService;
        this.participationRepository = participationRepository;
        this.playerService = playerService;
        this.matchService=matchService;
    }

}
