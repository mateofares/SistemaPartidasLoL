package com.service;

import com.dto.PlayerDTO;
import com.model.Elo;
import com.model.Player;
import com.model.Region;

import java.util.List;

public interface IPlayerService {

    public List<PlayerDTO> getAllPlayers();

    public List<PlayerDTO> filter(Long id,String nickname, Region region, Integer level, Elo elo);

    public void addPlayer(PlayerDTO playerDTO);

    public void updatePlayer(Long id,String nickname, Region region, Integer level, Elo elo);

    public void deletePlayer(Long id);

}
