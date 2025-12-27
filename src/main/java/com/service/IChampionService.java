package com.service;

import com.dto.ChampionDTO;
import com.dto.PlayerDTO;
import com.model.Difficulty;
import com.model.Role;

import java.util.List;

public interface IChampionService {

    public List<ChampionDTO> getAllChampions();

    public ChampionDTO findByNickname(String nickname);

    public List<ChampionDTO> findByRole(Role role);

    public List<ChampionDTO> findByDifficulty(Difficulty difficulty);

    public void addChampion();

    public void deleteChampion();
}
