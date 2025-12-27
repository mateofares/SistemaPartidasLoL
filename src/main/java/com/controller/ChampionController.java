package com.controller;

import com.dto.ChampionDTO;
import com.mapper.MapperChampion;
import com.model.Champion;
import com.repository.ChampionRepository;
import com.service.ChampionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("champion")
public class ChampionController {
    private final ChampionRepository championRepository;
    private final ChampionService championService;

    public ChampionController(ChampionRepository championRepository,
                              ChampionService championService){
        this.championRepository=championRepository;
        this.championService=championService;
    }

    @GetMapping("/{all}")
    public List<ChampionDTO> allChampions(){
        List<Champion> champions = championRepository.findAll();
        List<ChampionDTO> championsDto = new ArrayList<>(champions.size());
        for (Champion c : champions){
            championsDto.add(MapperChampion.toChampionDTO(c));
        }
        return championsDto;
    }

}
