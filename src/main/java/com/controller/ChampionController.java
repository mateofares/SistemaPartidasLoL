package com.controller;

import com.dto.ChampionDTO;
import com.mapper.MapperChampion;
import com.model.Champion;
import com.model.Difficulty;
import com.model.Role;
import com.repository.ChampionRepository;
import com.service.ChampionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("champion")
public class ChampionController {
    private final ChampionRepository championRepository;
    private final ChampionService championService;
    private final MapperChampion mapperChampion;

    public ChampionController(ChampionRepository championRepository,
                              ChampionService championService,
                              MapperChampion mapperChampion){
        this.championRepository=championRepository;
        this.championService=championService;
        this.mapperChampion=mapperChampion;
    }
    //Cambio: FILTRAR POR QUERY PARAM , NO TANTOS ENDPOINT
    @GetMapping("/all")
    public ResponseEntity<List<ChampionDTO>> allChampions(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Role role,
            @RequestParam(required = false) Difficulty difficulty
    ){
        return ResponseEntity.ok(championService.filter(name,role,difficulty));
    }
    

}
