package com.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "player")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nickname;

    @OneToMany(mappedBy = "player")
    private Set<Participation> participations;

    public Player(){}

    public Player(String nickname){
        this.nickname=nickname;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setParticipations(Set<Participation> participations) {
        this.participations = participations;
    }
}
