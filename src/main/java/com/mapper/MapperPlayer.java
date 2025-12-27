package com.mapper;

import com.dto.PlayerDTO;
import com.model.Player;

public class MapperPlayer {

    public static PlayerDTO toPlayerDTO(Player player){
        PlayerDTO playerDTO = new PlayerDTO(player.getId(),player.getNickname());
        return  playerDTO;
    }

}
