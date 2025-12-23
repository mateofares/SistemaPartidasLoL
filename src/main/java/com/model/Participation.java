package com.model;

import jakarta.persistence.*;

@Entity
public class Participation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int participationId;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Enumerated(EnumType.STRING)
    private TeamSide teamSide;

    @ManyToOne
    @JoinColumn(name = "player_id")
    private Player player;

    @ManyToOne
    @JoinColumn(name = "match_id")
    private Match match;

    @ManyToOne
    @JoinColumn(name = "champion_id")
    private Champion champion;

    public Participation(){}
    public Participation(Role role,TeamSide teamSide,Player player,Match match,Champion champion){
        this.role=role;
        this.teamSide=teamSide;
        this.player=player;
        this.match=match;
        this.champion=champion;
    }


    public void setChampion(Champion champion) {
        this.champion = champion;
    }

    public void setMatch(Match match) {
        this.match = match;
    }

    public void setParticipationId(int participationId) {
        this.participationId = participationId;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setTeamSide(TeamSide teamSide) {
        this.teamSide = teamSide;
    }
}


