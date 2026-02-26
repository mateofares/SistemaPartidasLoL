package com.controller;

import com.dto.MatchDTO;
import com.dto.ParticipationDTO;
import com.repository.MatchRepository;
import com.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("match")
@CrossOrigin(origins = "http://localhost:5173")

public class MatchController {

    private final MatchRepository matchRepository;
    private final MatchService matchService;

    public MatchController(MatchRepository matchRepository, MatchService matchService) {
        this.matchRepository = matchRepository;
        this.matchService = matchService;
    }

    @GetMapping("/get")
    public ResponseEntity<List<MatchDTO>> getMatch(
            @RequestParam(required = false) Long matchId,
            @RequestParam(required = false) Date date
    ){
        return ResponseEntity.ok(matchService.getMatchs(matchId,date));
    }

    @PostMapping("/add")
    public void addMatch(
            @RequestBody MatchDTO matchDTO
    ){
        matchService.addMatch(matchDTO);
    }
}
