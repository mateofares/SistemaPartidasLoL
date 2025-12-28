package com.controller;

import com.dto.PlayerDTO;
import com.model.Elo;
import com.model.Region;
import com.repository.PlayerRepository;
import com.service.PlayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("player")
public class PlayerController {
    private final PlayerRepository playerRepository;
    private final PlayerService playerService;

    public PlayerController(PlayerRepository playerRepository,PlayerService playerService){
        this.playerRepository=playerRepository;
        this.playerService=playerService;
    }

    @GetMapping("/get")
    public ResponseEntity<List<PlayerDTO>> getPlayers(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String nickname,
            @RequestParam(required = false) Region region,
            @RequestParam(required = false) Integer level,
            @RequestParam(required = false) Elo elo
            ){
        return ResponseEntity.ok(playerService.filter(id, nickname, region, level, elo));
    }

    @PostMapping("/add")
    public void addPlayer(
            @RequestBody PlayerDTO playerDTO
    ){
        playerService.addPlayer(playerDTO);
    }

    @PatchMapping("/update")
    public void updatePlayer(
            @RequestParam Long id,
            @RequestParam(required = false) String nickname,
            @RequestParam(required = false) Region region,
            @RequestParam(required = false) Integer level,
            @RequestParam(required = false) Elo elo
    ){
        playerService.updatePlayer(id, nickname, region, level, elo);
    }

    @DeleteMapping("/delete")
    public void deletePlayer(
            @RequestParam Long id
    ){
        playerService.deletePlayer(id);
    }

}
