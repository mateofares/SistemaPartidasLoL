package com.mapper;

import com.dto.ChampionDTO;
import com.dto.MatchDTO;
import com.model.Champion;

public class MapperChampion {

    //mapeo a PlayerDTO
    public static ChampionDTO toChampionDTO(Champion champion){

        if (champion == null) return null;

        ChampionDTO championDTO = new ChampionDTO(champion.getId(),
                champion.getName(),
                champion.getDescription(),
                champion.getRoles(),
                champion.getDifficulty(),
                champion.getTypeDamages());

        return championDTO;

    }

}
