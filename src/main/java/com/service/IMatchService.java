package com.service;

import com.dto.MatchDTO;
import com.dto.ParticipationDTO;
import com.dto.PlayerDTO;
import com.model.TeamSide;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface IMatchService {

    public List<MatchDTO> getMatchs(Long matchId, Date date);

    public void addMatch(MatchDTO matchDTO);

}
