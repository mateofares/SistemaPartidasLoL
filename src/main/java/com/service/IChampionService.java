package com.service;

import com.dto.ChampionDTO;
import com.model.Difficulty;
import com.model.Role;

import java.util.List;

public interface IChampionService {

    public List<ChampionDTO> getAllChampions();

    public ChampionDTO findByNickname(String nickname);

    public List<ChampionDTO> findByRole(Role role);

    public List<ChampionDTO> findByDifficulty(Difficulty difficulty);

    public void addChampion(ChampionDTO championDTO);

    public void deleteChampion(Long id);

    public List<ChampionDTO> filter(String name,Role role,Difficulty difficulty);
}
