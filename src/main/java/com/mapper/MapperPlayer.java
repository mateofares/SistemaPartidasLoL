package com.mapper;

import com.dto.PlayerDTO;
import com.model.Player;
import org.springframework.stereotype.Component;

@Component

public class MapperPlayer {

    public PlayerDTO toPlayerDTO(Player player){
        PlayerDTO playerDTO = new PlayerDTO(player.getId(),player.getNickname());
        return  playerDTO;
    }

}
