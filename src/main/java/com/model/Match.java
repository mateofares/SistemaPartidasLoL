package com.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Set;

@Entity
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int matchId;
    @Enumerated(EnumType.STRING)
    private TeamSide teamWinner;
    @OneToMany
    Set<Participation> participations;

    public Match(){}

    public Match(TeamSide teamWinner){
        this.teamWinner=teamWinner;
    }

    public void setMatchId(int matchId) {
        this.matchId = matchId;
    }

    public void setParticipations(Set<Participation> participations) {
        this.participations = participations;
    }

    public void setTeamWinner(TeamSide teamWinner) {
        this.teamWinner = teamWinner;
    }
}
