package com.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.time.*;
@Entity
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matchId;
    @Enumerated(EnumType.STRING)
    private TeamSide teamWinner;
    private LocalDate date;
    @OneToMany (mappedBy = "match")
    Set<Participation> participations;

    public Match(){}

    public Match(TeamSide teamWinner,LocalDate date){
        this.teamWinner=teamWinner;
        this.date=date;
    }

    public Set<Participation> getParticipations() {
        return participations;
    }

    public void setParticipations(Set<Participation> participations) {
        this.participations = participations;
    }

    public void setTeamWinner(TeamSide teamWinner) {
        this.teamWinner = teamWinner;
    }
}
