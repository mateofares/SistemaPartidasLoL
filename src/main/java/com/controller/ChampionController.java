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

    @GetMapping("/all")
    public ResponseEntity<List<ChampionDTO>> allChampions(){
        return ResponseEntity.ok(championService.getAllChampions());
    }

    @GetMapping("/name")
    public ResponseEntity<ChampionDTO> findByName(@RequestParam String name){
        return ResponseEntity.ok(championService.findByNickname(name));
    }

    @GetMapping("/role")
    public ResponseEntity<List<ChampionDTO>> getByRole(@RequestParam Role role){
        return ResponseEntity.ok(championService.findByRole(role));
    }

    @GetMapping("/difficulty")
    public ResponseEntity<List<ChampionDTO>> getByDifficulty(@RequestParam Difficulty difficulty){
        return ResponseEntity.ok(championService.findByDifficulty(difficulty));
    }



}
